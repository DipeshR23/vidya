import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Note {
  id: string;
  title: string;
  description: string;
  content: string;
  subject_id: string;
  grade_id: string;
  type: string;
  file_url: string | null;
  file_size: number | null;
  file_type: string | null;
  author_id: string;
  is_premium: boolean;
  price: number;
  downloads: number;
  rating: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  subjects?: { name: string };
  grades?: { name: string };
  profiles?: { full_name: string } | null;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
}

export interface Grade {
  id: string;
  name: string;
  level: number;
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select(`
          *,
          subjects(name),
          grades(name),
          profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes((data || []) as any);
    } catch (error: any) {
      toast({
        title: "Error fetching notes",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchSubjects = async () => {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name');

      if (error) throw error;
      setSubjects(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching subjects",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchGrades = async () => {
    try {
      const { data, error } = await supabase
        .from('grades')
        .select('*')
        .order('level');

      if (error) throw error;
      setGrades(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching grades",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchNotes(), fetchSubjects(), fetchGrades()]);
      setLoading(false);
    };

    loadData();
  }, []);

  const createNote = async (noteData: any) => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .insert([noteData])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Note created successfully.",
      });

      await fetchNotes(); // Refresh the list
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error creating note",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const uploadFile = async (file: File, bucket: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return { url: publicUrl, error: null };
    } catch (error: any) {
      toast({
        title: "Error uploading file",
        description: error.message,
        variant: "destructive",
      });
      return { url: null, error };
    }
  };

  return {
    notes,
    subjects,
    grades,
    loading,
    createNote,
    uploadFile,
    refreshNotes: fetchNotes,
  };
};