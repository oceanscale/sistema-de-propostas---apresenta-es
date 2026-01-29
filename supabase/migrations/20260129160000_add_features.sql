ALTER TABLE public.proposals ADD COLUMN IF NOT EXISTS view_mode TEXT DEFAULT 'document';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS snapshot JSONB;
