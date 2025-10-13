-- Enable RLS on subjects table
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- Create policy for subjects - public read access
CREATE POLICY "Anyone can view subjects" 
ON public.subjects 
FOR SELECT 
USING (true);

-- Enable RLS on grades table
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;

-- Create policy for grades - public read access
CREATE POLICY "Anyone can view grades" 
ON public.grades 
FOR SELECT 
USING (true);

-- Fix the function search path to be secure
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;