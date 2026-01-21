-- Add Google Maps fields to deal_submissions table
ALTER TABLE deal_submissions
ADD COLUMN IF NOT EXISTS place_id TEXT,
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);

-- Add comment for documentation
COMMENT ON COLUMN deal_submissions.place_id IS 'Google Maps Place ID for the property address';
COMMENT ON COLUMN deal_submissions.latitude IS 'Latitude coordinate from Google Maps';
COMMENT ON COLUMN deal_submissions.longitude IS 'Longitude coordinate from Google Maps';
