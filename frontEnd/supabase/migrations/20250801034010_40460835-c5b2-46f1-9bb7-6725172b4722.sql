-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('student', 'teacher', 'admin');

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  grade TEXT,
  school TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Users can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default subjects
INSERT INTO public.subjects (name, description) VALUES
('Mathematics', 'Mathematics and related topics'),
('Science', 'Physics, Chemistry, Biology'),
('English', 'English language and literature'),
('History', 'Historical studies and events'),
('Geography', 'Geographical studies'),
('Computer Science', 'Programming and computer studies'),
('Arts', 'Creative arts and design'),
('Physical Education', 'Sports and physical activities');

-- Create grades table
CREATE TABLE public.grades (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  level INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default grades
INSERT INTO public.grades (name, level) VALUES
('Class 1', 1), ('Class 2', 2), ('Class 3', 3), ('Class 4', 4), ('Class 5', 5),
('Class 6', 6), ('Class 7', 7), ('Class 8', 8), ('Class 9', 9), ('Class 10', 10),
('Class 11', 11), ('Class 12', 12), ('Undergraduate', 13), ('Postgraduate', 14);

-- Create notes/resources table
CREATE TABLE public.notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  subject_id UUID REFERENCES public.subjects(id),
  grade_id UUID REFERENCES public.grades(id),
  type TEXT NOT NULL DEFAULT 'notes',
  file_url TEXT,
  file_size INTEGER,
  file_type TEXT,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_premium BOOLEAN DEFAULT false,
  price DECIMAL(10,2) DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on notes
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Create notes policies
CREATE POLICY "Anyone can view public notes" 
ON public.notes 
FOR SELECT 
USING (is_premium = false OR auth.uid() = author_id);

CREATE POLICY "Users can create their own notes" 
ON public.notes 
FOR INSERT 
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own notes" 
ON public.notes 
FOR UPDATE 
USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own notes" 
ON public.notes 
FOR DELETE 
USING (auth.uid() = author_id);

-- Create marketplace items table
CREATE TABLE public.marketplace_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  condition TEXT NOT NULL DEFAULT 'new',
  image_url TEXT,
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  location TEXT,
  is_available BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on marketplace items
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;

-- Create marketplace policies
CREATE POLICY "Anyone can view available items" 
ON public.marketplace_items 
FOR SELECT 
USING (is_available = true);

CREATE POLICY "Users can create their own items" 
ON public.marketplace_items 
FOR INSERT 
WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update their own items" 
ON public.marketplace_items 
FOR UPDATE 
USING (auth.uid() = seller_id);

CREATE POLICY "Users can delete their own items" 
ON public.marketplace_items 
FOR DELETE 
USING (auth.uid() = seller_id);

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
('notes-files', 'notes-files', true),
('marketplace-images', 'marketplace-images', true),
('profile-avatars', 'profile-avatars', true);

-- Create storage policies for notes files
CREATE POLICY "Anyone can view notes files" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'notes-files');

CREATE POLICY "Authenticated users can upload notes files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'notes-files' AND auth.role() = 'authenticated');

-- Create storage policies for marketplace images
CREATE POLICY "Anyone can view marketplace images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'marketplace-images');

CREATE POLICY "Users can upload marketplace images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'marketplace-images' AND auth.role() = 'authenticated');

-- Create storage policies for profile avatars
CREATE POLICY "Anyone can view profile avatars" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'profile-avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'profile-avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON public.notes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketplace_items_updated_at
  BEFORE UPDATE ON public.marketplace_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();