-- Create deals table for property submissions
CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  
  -- Property Details
  property_address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  property_type VARCHAR(50) NOT NULL, -- Single Family, Multi-Family, Commercial, Land
  
  -- Deal Information
  asking_price DECIMAL(12, 2),
  estimated_arv DECIMAL(12, 2),
  estimated_repair_cost DECIMAL(12, 2),
  property_condition VARCHAR(50), -- Excellent, Good, Fair, Poor, Needs Major Repairs
  occupancy_status VARCHAR(50), -- Owner Occupied, Tenant Occupied, Vacant
  
  -- Additional Details
  property_description TEXT,
  reason_for_selling TEXT,
  timeline VARCHAR(50), -- ASAP, 1-3 months, 3-6 months, 6+ months, Flexible
  
  -- Attachments (stored as JSON array of URLs)
  photos JSONB DEFAULT '[]'::jsonb,
  documents JSONB DEFAULT '[]'::jsonb,
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'pending', -- pending, reviewing, approved, rejected, closed
  notes TEXT,
  
  -- Metadata
  source VARCHAR(50) DEFAULT 'website', -- website, referral, direct
  ip_address INET,
  user_agent TEXT
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  
  -- Appointment Details
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(50) NOT NULL,
  appointment_type VARCHAR(100) NOT NULL, -- Deal Discussion, Property Walkthrough, General Consultation
  
  -- Additional Information
  message TEXT,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  confirmed_datetime TIMESTAMP WITH TIME ZONE,
  
  -- Related deal (optional)
  deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_deals_email ON deals(email);
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_created_at ON deals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(email);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_preferred_date ON appointments(preferred_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to auto-update updated_at
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
