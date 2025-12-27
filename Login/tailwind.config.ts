-- EXTENSÃO NECESSÁRIA
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================
-- TABELA USUÁRIOS
-- =========================
CREATE TABLE usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  youtube_id VARCHAR(100) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT false,
  device_id VARCHAR(255),
  device_fingerprint TEXT,
  last_login TIMESTAMPTZ,
  login_count INTEGER DEFAULT 0,
  is_locked BOOLEAN DEFAULT false,
  lock_reason VARCHAR(100),
  payment_id VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =========================
-- TABELA PAGAMENTOS
-- =========================
CREATE TABLE pagamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  payment_id VARCHAR(100) UNIQUE NOT NULL,
  status VARCHAR(50) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  product_id VARCHAR(100),
  gateway VARCHAR(50) DEFAULT 'tribopay',
  created_at TIMESTAMPTZ DEFAU_
