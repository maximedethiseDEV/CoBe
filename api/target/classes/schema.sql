-- Refactored PostgreSQL Database Schema with English names
-- Basic tables

-- Country table (previously Pays)
CREATE TABLE IF NOT EXISTS "country" (
                           "country_id" VARCHAR(3) PRIMARY KEY,
                           "country_name" VARCHAR(255) NOT NULL
);

-- City table (previously Ville)
CREATE TABLE IF NOT EXISTS "city" (
                        "city_id" VARCHAR(6) PRIMARY KEY,
                        "city_name" VARCHAR(255) NOT NULL,
                        "destination_code" VARCHAR(255),
                        "country_id" VARCHAR(3) NOT NULL,
                        CONSTRAINT "fk_city_country" FOREIGN KEY ("country_id") REFERENCES "country"("country_id") ON DELETE RESTRICT
);
CREATE INDEX "idx_city_name" ON "city" ("city_name");

-- Address table (previously Adresse)
CREATE TABLE IF NOT EXISTS "address" (
                           "address_id" SERIAL PRIMARY KEY,
                           "city_id" VARCHAR(6) NOT NULL,
                           "street" VARCHAR(255) NOT NULL,
                           CONSTRAINT "fk_address_city" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE RESTRICT
);
CREATE INDEX "idx_address_street" ON "address" ("street");

-- Contact table
CREATE TABLE IF NOT EXISTS "contact" (
                           "contact_id" SERIAL PRIMARY KEY,
                           "last_name" VARCHAR(255) NOT NULL,
                           "first_name" VARCHAR(255),
                           "phone" VARCHAR(255),
                           "email" VARCHAR(255),
                           "role" VARCHAR(255),
                           CONSTRAINT "uq_contact_email" UNIQUE ("email")
);
CREATE INDEX "idx_contact_email" ON "contact" ("email");

-- Company table (previously Entreprise)
CREATE TABLE IF NOT EXISTS "company" (
                           "company_id" SERIAL PRIMARY KEY,
                           "name" VARCHAR(255) NOT NULL,
                           "primary_contact_id" INTEGER,
                           "address_id" INTEGER,
                           "attachment_path" VARCHAR(255),
                           "notes" TEXT,
                           "is_solvent" BOOLEAN DEFAULT TRUE,
                           CONSTRAINT "fk_company_contact" FOREIGN KEY ("primary_contact_id") REFERENCES "contact"("contact_id") ON DELETE SET NULL,
                           CONSTRAINT "fk_company_address" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE SET NULL
);
CREATE INDEX "idx_company_name" ON "company" ("name");

-- User table (previously Utilisateur)
CREATE TABLE IF NOT EXISTS "dbuser" (
                        "user_id" SERIAL PRIMARY KEY,
                        "username" VARCHAR(255) NOT NULL,
                        "password_hash" VARCHAR(255) NOT NULL,
                        "contact_id" INTEGER,
                        "role" VARCHAR(50),
                        CONSTRAINT "uq_user_username" UNIQUE ("username"),
                        CONSTRAINT "fk_user_contact" FOREIGN KEY ("contact_id") REFERENCES "contact"("contact_id") ON DELETE SET NULL
);

-- Transport supplier (previously FournisseurTransport)
CREATE TABLE IF NOT EXISTS "transport_supplier" (
                                      "transport_supplier_id" SERIAL PRIMARY KEY,
                                      "company_id" INTEGER NOT NULL,
                                      "license_number" VARCHAR(255),
                                      CONSTRAINT "fk_transport_supplier_company" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE CASCADE
);

-- Materials supplier (previously FournisseurMateriaux)
CREATE TABLE IF NOT EXISTS "material_supplier" (
                                     "material_supplier_id" SERIAL PRIMARY KEY,
                                     "company_id" INTEGER NOT NULL,
                                     "contact_id" INTEGER,
                                     "loading_address_id" INTEGER,
                                     "notes" TEXT,
                                     CONSTRAINT "fk_material_supplier_company" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE CASCADE,
                                     CONSTRAINT "fk_material_supplier_contact" FOREIGN KEY ("contact_id") REFERENCES "contact"("contact_id") ON DELETE SET NULL,
                                     CONSTRAINT "fk_material_supplier_address" FOREIGN KEY ("loading_address_id") REFERENCES "address"("address_id") ON DELETE SET NULL
);

-- Client table
CREATE TABLE IF NOT EXISTS "client" (
                          "client_id" SERIAL PRIMARY KEY,
                          "company_id" INTEGER NOT NULL,
                          "contact_id" INTEGER,
                          "delivery_address_id" INTEGER,
                          "attachment_path" VARCHAR(255),
                          "notes" TEXT,
                          "start_date" DATE,
                          "end_date" DATE,
                          CONSTRAINT "fk_client_company" FOREIGN KEY ("company_id") REFERENCES "company"("company_id") ON DELETE CASCADE,
                          CONSTRAINT "fk_client_contact" FOREIGN KEY ("contact_id") REFERENCES "contact"("contact_id") ON DELETE SET NULL,
                          CONSTRAINT "fk_client_address" FOREIGN KEY ("delivery_address_id") REFERENCES "address"("address_id") ON DELETE SET NULL
);

-- Product table (previously Produit)
CREATE TABLE IF NOT EXISTS "product" (
                           "product_id" VARCHAR(255) PRIMARY KEY,
                           "name" VARCHAR(255) NOT NULL,
                           "material_supplier_id" INTEGER,
                           "notes" TEXT,
                           CONSTRAINT "fk_product_supplier" FOREIGN KEY ("material_supplier_id") REFERENCES "material_supplier"("material_supplier_id") ON DELETE SET NULL
);

-- Order table (previously Commande)
CREATE TABLE IF NOT EXISTS "orders" (
                         "order_id" SERIAL PRIMARY KEY,
                         "billing_client_id" INTEGER NOT NULL,
                         "delivery_client_id" INTEGER,
                         "notes" TEXT,
                         "attachment_path" VARCHAR(255),
                         "requested_delivery_date" DATE,
                         "requested_delivery_time" TIME,
                         "product_id" VARCHAR(255) NOT NULL,
                         "quantity" INTEGER NOT NULL,
                         CONSTRAINT "fk_order_billing_client" FOREIGN KEY ("billing_client_id") REFERENCES "client"("client_id") ON DELETE RESTRICT,
                         CONSTRAINT "fk_order_delivery_client" FOREIGN KEY ("delivery_client_id") REFERENCES "client"("client_id") ON DELETE SET NULL,
                         CONSTRAINT "fk_order_product" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT
);

-- Delivery order number (previously NumeroCommandeLivraison)
CREATE TABLE IF NOT EXISTS "delivery_order_number" (
                                         "delivery_order_number_id" VARCHAR(255) PRIMARY KEY,
                                         "transport_supplier_id" INTEGER NOT NULL,
                                         "city_id" VARCHAR(6) NOT NULL,
                                         "product_id" VARCHAR(255) NOT NULL,
                                         CONSTRAINT "fk_delivery_order_transport" FOREIGN KEY ("transport_supplier_id") REFERENCES "transport_supplier"("transport_supplier_id") ON DELETE RESTRICT,
                                         CONSTRAINT "fk_delivery_order_city" FOREIGN KEY ("city_id") REFERENCES "city"("city_id") ON DELETE RESTRICT,
                                         CONSTRAINT "fk_delivery_order_product" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT
);

-- Delivery table (previously Livraison)
CREATE TABLE IF NOT EXISTS "delivery" (
                            "delivery_id" SERIAL PRIMARY KEY,
                            "order_id" INTEGER NOT NULL,
                            "transport_supplier_id" INTEGER NOT NULL,
                            "delivery_order_number_id" VARCHAR(255) NOT NULL,
                            "actual_delivery_date" DATE,
                            "actual_delivery_time" TIME,
                            "status" VARCHAR(50) NOT NULL CHECK (status IN ('NEW', 'SCHEDULED', 'DISPATCHED', 'LOADED')),
                            CONSTRAINT "fk_delivery_order" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE RESTRICT,
                            CONSTRAINT "fk_delivery_transport" FOREIGN KEY ("transport_supplier_id") REFERENCES "transport_supplier"("transport_supplier_id") ON DELETE RESTRICT,
                            CONSTRAINT "fk_delivery_order_number" FOREIGN KEY ("delivery_order_number_id") REFERENCES "delivery_order_number"("delivery_order_number_id") ON DELETE RESTRICT
);

-- Archived delivery table (previously LivraisonArchive)
CREATE TABLE IF NOT EXISTS "delivery_archive" (
                                    "delivery_archive_id" SERIAL PRIMARY KEY,
                                    "order_id" INTEGER,
                                    "transport_supplier_id" INTEGER,
                                    "delivery_order_number_id" VARCHAR(255),
                                    "actual_delivery_date" DATE,
                                    "actual_delivery_time" TIME,
                                    "status" VARCHAR(50)
);

-- Construction site address (previously AdresseChantier)
CREATE TABLE IF NOT EXISTS "construction_site" (
                                     "construction_site_id" SERIAL PRIMARY KEY,
                                     "client_id" INTEGER NOT NULL,
                                     "address_id" INTEGER NOT NULL,
                                     CONSTRAINT "fk_construction_site_client" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE CASCADE,
                                     CONSTRAINT "fk_construction_site_address" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE RESTRICT
);