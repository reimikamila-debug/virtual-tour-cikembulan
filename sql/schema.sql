CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS admins (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), username VARCHAR(80) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
CREATE TABLE IF NOT EXISTS hewan (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), nama_hewan VARCHAR(120) NOT NULL, ukuran VARCHAR(40) NOT NULL, jenis VARCHAR(60) NOT NULL, jenis_kelamin VARCHAR(20) NOT NULL CHECK (jenis_kelamin IN ('Jantan', 'Betina')), foto TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW());
ALTER TABLE hewan ADD COLUMN IF NOT EXISTS foto TEXT;
-- Hash contoh: node -e "console.log(require('bcrypt').hashSync('admin123', 12))"
-- INSERT INTO admins (username, password) VALUES ('admin', 'PASTE_BCRYPT_HASH_HERE');
