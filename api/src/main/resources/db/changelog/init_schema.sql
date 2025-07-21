CREATE EXTENSION IF NOT EXISTS pgcrypto; -- Requis pour gen_random_uuid()

CREATE TABLE "country"
(
    "id"    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "country_code"  VARCHAR(3) UNIQUE NOT NULL,
    "country_name"  VARCHAR(255)      NOT NULL,
    "created_date"    TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"    TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE "city"
(
    "id"       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "postal_code"   VARCHAR(6) UNIQUE NOT NULL,
    "city_name"     VARCHAR(255)      NOT NULL,
    "country_id"    UUID             NOT NULL REFERENCES "country" ("id") ON DELETE RESTRICT,
    "created_date"    TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX "idx_city_name" ON "city" ("city_name");

CREATE TABLE "address"
(
    "id"    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "city_id"       UUID      NOT NULL REFERENCES "city" ("id") ON DELETE RESTRICT,
    "street"        VARCHAR(255) NOT NULL,
    "created_date"    TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"    TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE "shared_details"
(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "attachment_path"   VARCHAR(255),
    "notes"             TEXT,
    "created_date"        TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "contact"
(
    "id"    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "last_name"     VARCHAR(255) NOT NULL,
    "first_name"    VARCHAR(255),
    "phone"         VARCHAR(255),
    "email"         VARCHAR(255) UNIQUE,
    "role"          VARCHAR(50),
    "created_date"    TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"    TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE "dbuser"
(
    "id"       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "username"      VARCHAR(255) NOT NULL UNIQUE,
    "password_hash" VARCHAR(255) NOT NULL,
    "contact_id"    UUID         REFERENCES "contact" ("id") ON DELETE SET NULL,
    "permission"    VARCHAR(50),
    "created_date"    TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"    TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE "company"
(
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name"                VARCHAR(255) NOT NULL UNIQUE,
    "commercially_active" BOOLEAN      NOT NULL,
    "contact_id"  UUID         REFERENCES "contact" ("id") ON DELETE SET NULL,
    "address_id"          UUID         REFERENCES "address" ("id") ON DELETE SET NULL,
    "shared_details_id"   UUID         REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "created_date"          TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX "idx_company_name_active" ON "company" ("name" ASC) WHERE "commercially_active" = TRUE;


CREATE TABLE "transport_supplier"
(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "company_id"            UUID NOT NULL REFERENCES "company" ("id") ON DELETE CASCADE,
    "license_number"        VARCHAR(255),
    "created_date"            TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "material_supplier"
(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "company_id"           UUID NOT NULL REFERENCES "company" ("id") ON DELETE CASCADE,
    "contact_id"           UUID REFERENCES "contact" ("id") ON DELETE SET NULL,
    "loading_address_id"   UUID REFERENCES "address" ("id") ON DELETE SET NULL,
    "shared_details_id"    UUID REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "created_date"           TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"           TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE customer
(
    "id"         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "company_id"          UUID NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    "contact_id"          UUID REFERENCES contact (id) ON DELETE SET NULL,
    "shared_details_id"   UUID REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "date_start"          DATE,
    "date_end"            DATE,
    "is_solvent"          BOOLEAN NOT NULL,
    "parent_id"           UUID REFERENCES customer (id) ON DELETE SET NULL,
    "created_date"          TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"          TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE "construction_site"
(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "address_id"           UUID NOT NULL REFERENCES "address" ("id") ON DELETE RESTRICT,
    "customer_id"          UUID REFERENCES customer ("id"),
    "shared_details_id"    UUID REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "date_start"           DATE,
    "date_end"             DATE,
    "created_date"           TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"           TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE "product"
(
    "id"           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "product_code"         VARCHAR(255) NOT NULL UNIQUE,
    "material_supplier_id" UUID REFERENCES "material_supplier" ("id") ON DELETE SET NULL,
    "shared_details_id"    UUID REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "created_date"           TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"           TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE "purchase_order"
(
    "id"                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "billing_customer_id"     UUID NOT NULL REFERENCES "customer" ("id") ON DELETE RESTRICT,
    "delivery_customer_id"    UUID REFERENCES "customer" ("id") ON DELETE SET NULL,
    "construction_site_id"    UUID REFERENCES "construction_site" ("id") ON DELETE SET NULL,
    "product_id"              UUID NOT NULL REFERENCES "product" ("id") ON DELETE RESTRICT,
    "quantity"                INTEGER NOT NULL,
    "requested_delivery_date" DATE,
    "requested_delivery_time" TIME,
    "shared_details_id"       UUID REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "created_date"              TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"              TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "delivery_order_number"
(
    "id"      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "transport_supplier_id"         UUID NOT NULL REFERENCES "transport_supplier" ("id") ON DELETE RESTRICT,
    "customer_id"                   UUID NOT NULL REFERENCES "customer" ("id") ON DELETE RESTRICT,
    "city_id"                       UUID NOT NULL REFERENCES "city" ("id") ON DELETE RESTRICT,
    "product_id"                    UUID NOT NULL REFERENCES "product" ("id") ON DELETE RESTRICT,
    "unique_delivery_order_number" VARCHAR(20) UNIQUE NOT NULL,
    "created_date"    TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE delivery_status
(
    id SERIAL PRIMARY KEY,
    status    VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE "delivery"
(
    "id"              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "order_id"                 UUID NOT NULL REFERENCES "purchase_order" ("id") ON DELETE RESTRICT,
    "transport_supplier_id"    UUID NOT NULL REFERENCES "transport_supplier" ("id") ON DELETE RESTRICT,
    "delivery_order_number_id" UUID  REFERENCES "delivery_order_number" ("id") ON DELETE RESTRICT,
    "actual_delivery_date"     DATE,
    "actual_delivery_time"     TIME,
    "quantity"                 INTEGER NOT NULL,
    "status_id"                SERIAL NOT NULL REFERENCES "delivery_status" ("id"),
    "created_date"               TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"               TIMESTAMPTZ DEFAULT NOW()
);