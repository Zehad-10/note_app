import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://yfpwmiveopvvvfqyslfu.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmcHdtaXZlb3B2dnZmcXlzbGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzczODk3OTEsImV4cCI6MTk5Mjk2NTc5MX0.CX-2P_1uqq_WbRiU4NU5Vkcrm6BP8hqAIRP1j-Yp6ec",
);
