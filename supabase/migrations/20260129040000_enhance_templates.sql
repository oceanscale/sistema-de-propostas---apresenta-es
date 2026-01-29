ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS content JSONB;
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS type TEXT;
