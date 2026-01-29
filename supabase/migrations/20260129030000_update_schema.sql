ALTER TABLE public.proposals ADD COLUMN IF NOT EXISTS content JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cpf TEXT;
