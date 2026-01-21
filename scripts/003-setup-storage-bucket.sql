-- Create public storage bucket for contract documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-contracts', 'public-contracts', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies to allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'public-contracts');

-- Allow authenticated users to upload (optional - for admin use)
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'public-contracts' AND auth.role() = 'authenticated');
