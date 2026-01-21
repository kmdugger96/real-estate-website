-- New schema to support dynamic intake workflow with multiple user paths

-- Create submissions table (replaces deals table for multi-purpose intake)
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Step 1: Identity & Purpose
  role VARCHAR(50), -- sub2-student, gator-student, neither
  purposes JSONB DEFAULT '[]'::jsonb, -- Array: submit-deal, acquire-deal, provide-funding, get-funding, network
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  free_notes TEXT,
  
  -- Step 2A: Deal Submission
  property_address VARCHAR(500),
  asking_price DECIMAL(12, 2),
  contract_status VARCHAR(50), -- under-contract, not-under-contract, own-property
  property_type VARCHAR(50),
  short_description TEXT,
  deal_end_goals JSONB DEFAULT '[]'::jsonb, -- Array of goals
  
  -- Step 2B: Investor Acquisition
  state VARCHAR(50),
  county_township VARCHAR(100),
  price_range_min DECIMAL(12, 2),
  price_range_max DECIMAL(12, 2),
  investor_property_types JSONB DEFAULT '[]'::jsonb,
  rehab_tolerance VARCHAR(50),
  experience_level VARCHAR(50),
  exit_goals JSONB DEFAULT '[]'::jsonb,
  funding_methods JSONB DEFAULT '[]'::jsonb,
  timeline_to_acquire VARCHAR(50),
  last_deal_closed VARCHAR(255),
  proof_of_funds_url VARCHAR(500),
  
  -- Step 2C: Lender / Private Money Partner
  lending_regions TEXT,
  loan_amount_range VARCHAR(100),
  preferred_asset_types TEXT,
  lending_position_preferences JSONB DEFAULT '[]'::jsonb,
  types_of_lending JSONB DEFAULT '[]'::jsonb,
  funding_sources JSONB DEFAULT '[]'::jsonb,
  cash_source_breakdown JSONB DEFAULT '[]'::jsonb,
  
  -- Step 2D: Get Funding (Borrower)
  amount_requested DECIMAL(12, 2),
  timeline_to_close VARCHAR(100),
  funding_type_needed JSONB DEFAULT '[]'::jsonb,
  supporting_docs_url VARCHAR(500),
  
  -- Step 2E: Networking
  area_of_interest VARCHAR(100),
  networking_message TEXT,
  
  -- Step 3: General Context
  access_type VARCHAR(50),
  best_next_step VARCHAR(50),
  anything_else TEXT,
  
  -- Attachments
  photos JSONB DEFAULT '[]'::jsonb,
  documents JSONB DEFAULT '[]'::jsonb,
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  
  -- Metadata
  source VARCHAR(50) DEFAULT 'website',
  ip_address INET,
  user_agent TEXT
);

-- Keep original deals table for backward compatibility
-- (Already exists from 001-create-tables.sql)

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_purposes ON submissions USING GIN(purposes);

-- Add trigger for updated_at
CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
