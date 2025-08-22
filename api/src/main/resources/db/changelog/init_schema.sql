CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "country"
(
    "id"    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "country_code"  VARCHAR(2) UNIQUE NOT NULL,
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
    "street"        VARCHAR(255),
    "city_id"       UUID      NOT NULL REFERENCES "city" ("id") ON DELETE RESTRICT,
    "created_date"    TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"    TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE "shared_details"
(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "label"     VARCHAR(30) UNIQUE NOT NULL,
    "file_name"   VARCHAR(100),
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
    "permission"    VARCHAR(50),
    "contact_id"    UUID         UNIQUE REFERENCES "contact" ("id") ON DELETE SET NULL,
    "created_date"    TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"    TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE "company"
(
    "id"          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name"                VARCHAR(255) NOT NULL,
    "commercially_active" BOOLEAN      NOT NULL,
    "parent_id"           UUID REFERENCES company (id) ON DELETE SET NULL,
    "address_id"          UUID         UNIQUE REFERENCES "address" ("id") ON DELETE SET NULL,
    "shared_details_id"   UUID         REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "created_date"          TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX "idx_company_name_active" ON "company" ("name" ASC) WHERE "commercially_active" = TRUE;


CREATE TABLE "transport_supplier"
(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "license_number"        VARCHAR(255),
    "company_id"            UUID UNIQUE NOT NULL REFERENCES "company" ("id") ON DELETE CASCADE,
    "contact_id"          UUID UNIQUE REFERENCES contact (id) ON DELETE SET NULL,
    "created_date"            TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "material_supplier"
(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "company_id"           UUID UNIQUE NOT NULL REFERENCES "company" ("id") ON DELETE CASCADE,
    "contact_id"           UUID UNIQUE REFERENCES "contact" ("id") ON DELETE SET NULL,
    "loading_address_id"   UUID UNIQUE REFERENCES "address" ("id") ON DELETE SET NULL,
    "shared_details_id"    UUID REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "created_date"           TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"           TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE "customer"
(
    "id"         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "date_start"          TIMESTAMPTZ,
    "date_end"            TIMESTAMPTZ,
    "is_solvent"          BOOLEAN NOT NULL,
    "company_id"          UUID UNIQUE NOT NULL REFERENCES company (id) ON DELETE CASCADE,
    "contact_id"          UUID UNIQUE REFERENCES contact (id) ON DELETE SET NULL,
    "shared_details_id"   UUID REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "created_date"          TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "construction_site"
(
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "date_start"           TIMESTAMPTZ,
    "date_end"             TIMESTAMPTZ,
    "customer_id"          UUID REFERENCES customer ("id") NOT NULL,
    "address_id"           UUID NOT NULL REFERENCES "address" ("id") ON DELETE RESTRICT,
    "contact_id"          UUID REFERENCES contact (id) ON DELETE SET NULL,
    "shared_details_id"    UUID REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "created_date"           TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"           TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "product"
(
    "id"           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "code"         VARCHAR(4) UNIQUE NOT NULL,
    "name"         VARCHAR(100) NOT NULL,
    "material_supplier_id" UUID REFERENCES "material_supplier" ("id") ON DELETE SET NULL,
    "shared_details_id"    UUID REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "created_date"           TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"           TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "purchase_order"
(
    "id"                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "quantity"                INTEGER NOT NULL,
    "requested_delivery_begin"  TIMESTAMPTZ,
    "requested_delivery_end"    TIMESTAMPTZ,
    "customer_id"     UUID NOT NULL REFERENCES "customer" ("id") ON DELETE RESTRICT,
    "construction_site_id"    UUID REFERENCES "construction_site" ("id") ON DELETE RESTRICT,
    "product_id"              UUID NOT NULL REFERENCES "product" ("id") ON DELETE RESTRICT,
    "shared_details_id"       UUID REFERENCES "shared_details" ("id") ON DELETE SET NULL,
    "created_date"              TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"              TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "delivery_order_number"
(
    "id"      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "unique_delivery_order_number" VARCHAR(20) UNIQUE NOT NULL,
    "transport_supplier_id"         UUID NOT NULL REFERENCES "transport_supplier" ("id") ON DELETE RESTRICT,
    "customer_id"                   UUID NOT NULL REFERENCES "customer" ("id") ON DELETE RESTRICT,
    "city_id"                       UUID NOT NULL REFERENCES "city" ("id") ON DELETE RESTRICT,
    "product_id"                    UUID NOT NULL REFERENCES "product" ("id") ON DELETE RESTRICT,
    "created_date"    TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "delivery_status"
(
    "id"      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name"    VARCHAR(50) UNIQUE NOT NULL,
    "created_date"               TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"               TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "delivery"
(
    "id"              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "actual_delivery_begin"    TIMESTAMPTZ,
    "actual_delivery_end"      TIMESTAMPTZ,
    "quantity"                 INTEGER NOT NULL,
    "order_id"                 UUID NOT NULL REFERENCES "purchase_order" ("id") ON DELETE RESTRICT,
    "transport_supplier_id"    UUID REFERENCES "transport_supplier" ("id") ON DELETE SET NULL,
    "delivery_order_number_id" UUID  REFERENCES "delivery_order_number" ("id") ON DELETE SET NULL,
    "status_id"                UUID NOT NULL REFERENCES "delivery_status" ("id"),
    "created_date"               TIMESTAMPTZ DEFAULT NOW(),
    "last_modified_date"               TIMESTAMPTZ DEFAULT NOW()
);