-- Dépendances: extension pgcrypto (pour bcrypt via crypt/gen_salt)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

BEGIN;

WITH ins_contact AS (
    INSERT INTO "contact" ("last_name", "first_name", "phone", "email", "role")
    VALUES ('Root', 'Super', '+32000000001', 'superadmin@local.test', 'SUPER_ADMIN')
    RETURNING id
)
INSERT INTO "dbuser" ("username", "password_hash", "permission", "contact_id")
SELECT
    'superadmin',
    crypt('superadmin123', gen_salt('bf')),
    'SUPER_ADMIN',
    id
FROM ins_contact;

-- 3) ADMIN
-- Mot de passe: admin123
WITH ins_contact AS (
    INSERT INTO "contact" ("last_name", "first_name", "phone", "email", "role")
    VALUES ('Admin', 'Alice', '+32000000002', 'admin@local.test', 'ADMIN')
    RETURNING id
)
INSERT INTO "dbuser" ("username", "password_hash", "permission", "contact_id")
SELECT
    'admin',
    crypt('admin123', gen_salt('bf')),
    'ADMIN',
    id
FROM ins_contact;

-- 4) USER
-- Mot de passe: user123
WITH ins_contact AS (
    INSERT INTO "contact" ("last_name", "first_name", "phone", "email", "role")
    VALUES ('User', 'Bob', '+32000000003', 'user@local.test', 'USER')
    RETURNING id
)
INSERT INTO "dbuser" ("username", "password_hash", "permission", "contact_id")
SELECT
    'user',
    crypt('user123', gen_salt('bf')),
    'USER',
    id
FROM ins_contact;

COMMIT;
