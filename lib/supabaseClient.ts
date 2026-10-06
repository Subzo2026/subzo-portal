import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://adisxazpgttmtymxaioq.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkaXN4YXpwZ3R0bXR5bXhhaW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExOTA4NzEsImV4cCI6MjEwNjc2Njg3MX0.X1PeOTpW7lub03vd8_hJ1TnmIphtp1lkC7eCSiOHn4k";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);