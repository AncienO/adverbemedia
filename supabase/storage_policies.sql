-- Storage RLS Policies for the 'uploads' bucket
-- Run this in your Supabase SQL Editor

-- Allow authenticated users to upload files
CREATE POLICY "Auth Upload Files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'uploads');

-- Allow authenticated users to update/overwrite files
CREATE POLICY "Auth Update Files"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'uploads')
WITH CHECK (bucket_id = 'uploads');

-- Allow authenticated users to delete files
CREATE POLICY "Auth Delete Files"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'uploads');

-- Allow public read access to all files
CREATE POLICY "Public Read Files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'uploads');
