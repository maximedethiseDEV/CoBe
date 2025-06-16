-- Insertion dans la table "country"
INSERT INTO "country" ("country_code", "country_name")
VALUES 
    ('FRA', 'France'),
    ('USA', 'États-Unis'),
    ('CAN', 'Canada'),
    ('GBR', 'Royaume-Uni'),
    ('DEU', 'Allemagne'),
    ('ESP', 'Espagne'),
    ('ITA', 'Italie'),
    ('NLD', 'Pays-Bas'),
    ('BEL', 'Belgique'),
    ('JPN', 'Japon');

-- Insertion dans la table "city"
INSERT INTO "city" ("postal_code", "city_name", "country_id")
VALUES 
    ('75000', 'Paris', (SELECT "country_id" FROM "country" WHERE "country_code" = 'FRA')),
    ('10001', 'New York', (SELECT "country_id" FROM "country" WHERE "country_code" = 'USA')),
    ('H1A0A1', 'Montreal', (SELECT "country_id" FROM "country" WHERE "country_code" = 'CAN')),
    ('WC2N', 'Londres', (SELECT "country_id" FROM "country" WHERE "country_code" = 'GBR')),
    ('50667', 'Cologne', (SELECT "country_id" FROM "country" WHERE "country_code" = 'DEU')),
    ('28001', 'Madrid', (SELECT "country_id" FROM "country" WHERE "country_code" = 'ESP')),
    ('00184', 'Rome', (SELECT "country_id" FROM "country" WHERE "country_code" = 'ITA')),
    ('1011AA', 'Amsterdam', (SELECT "country_id" FROM "country" WHERE "country_code" = 'NLD')),
    ('1000', 'Bruxelles', (SELECT "country_id" FROM "country" WHERE "country_code" = 'BEL')),
    ('100001', 'Tokyo', (SELECT "country_id" FROM "country" WHERE "country_code" = 'JPN'));

-- Insertion dans la table "address"
INSERT INTO "address" ("city_id", "street")
VALUES 
    ((SELECT "city_id" FROM "city" WHERE "city_name" = 'Paris'), '12 Rue Lafayette'),
    ((SELECT "city_id" FROM "city" WHERE "city_name" = 'New York'), '5th Avenue'),
    ((SELECT "city_id" FROM "city" WHERE "city_name" = 'Montreal'), 'Boulevard Saint-Laurent'),
    ((SELECT "city_id" FROM "city" WHERE "city_name" = 'Londres'), 'Oxford Street'),
    ((SELECT "city_id" FROM "city" WHERE "city_name" = 'Cologne'), 'Domkloster'),
    ((SELECT "city_id" FROM "city" WHERE "city_name" = 'Madrid'), 'Calle Gran Via'),
    ((SELECT "city_id" FROM "city" WHERE "city_name" = 'Rome'), 'Via Nazionale'),
    ((SELECT "city_id" FROM "city" WHERE "city_name" = 'Amsterdam'), 'Damrak'),
    ((SELECT "city_id" FROM "city" WHERE "city_name" = 'Bruxelles'), 'Rue des Bouchers'),
    ((SELECT "city_id" FROM "city" WHERE "city_name" = 'Tokyo'), 'Shinjuku Street');

-- Insertion dans la table "shared_details"
INSERT INTO "shared_details" ("attachment_path", "notes")
VALUES
    ('/files/shared1.pdf', 'Détails partagés 1'),
    ('/files/shared2.pdf', 'Détails partagés 2'),
    ('/files/shared3.pdf', 'Détails partagés 3'),
    ('/files/shared4.pdf', 'Détails partagés 4'),
    ('/files/shared5.pdf', 'Détails partagés 5'),
    ('/files/shared6.pdf', 'Détails partagés 6'),
    ('/files/shared7.pdf', 'Détails partagés 7'),
    ('/files/shared8.pdf', 'Détails partagés 8'),
    ('/files/shared9.pdf', 'Détails partagés 9'),
    ('/files/shared10.pdf', 'Détails partagés 10');

-- Insertion dans la table "contact"
INSERT INTO "contact" ("last_name", "first_name", "phone", "email", "role")
VALUES 
    ('Durand', 'Alice', '+33123456789', 'alice.durand@example.com', 'Admin'),
    ('Martin', 'Bob', '+33234567890', 'bob.martin@example.com', 'Manager'),
    ('Dupont', 'Eve', '+33345678901', 'eve.dupont@example.com', 'User'),
    ('Morel', 'Charlie', '+33456789012', 'charlie.morel@example.com', 'Dispatcher'),
    ('Petit', 'Diane', '+33567890123', 'diane.petit@example.com', 'Driver'),
    ('Roux', 'Edouard', '+33678901234', 'edouard.roux@example.com', 'User'),
    ('Faure', 'Fiona', '+33789012345', 'fiona.faure@example.com', 'Admin'),
    ('Garnier', 'George', '+33890123456', 'george.garnier@example.com', 'Dispatcher'),
    ('Clément', 'Hélène', '+33901234567', 'helene.clement@example.com', 'Manager'),
    ('Blanc', 'Inès', '+33101123456', 'ines.blanc@example.com', 'Driver');

-- Insertion dans la table "company"
INSERT INTO "company" ("name", "commercially_active", "primary_contact_id", "address_id", "shared_details_id")
VALUES ('Alpha Construction', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Durand'),
        (SELECT "address_id" FROM "address" WHERE "street" = '12 Rue Lafayette'), NULL),
       ('Bravo Logistics', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Martin'),
        (SELECT "address_id" FROM "address" WHERE "street" = '5th Avenue'), NULL),
       ('Charlie Materials', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Dupont'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Boulevard Saint-Laurent'), NULL),
       ('Delta Supplies', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Morel'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Oxford Street'), NULL),
       ('Echo Transport', FALSE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Petit'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Domkloster'), NULL),
       ('Foxtrot Industries', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Roux'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Calle Gran Via'), NULL),
       ('Golf Traders', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Faure'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Via Nazionale'), NULL),
       ('Hotel Aggregates', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Garnier'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Damrak'), NULL),
       ('India Delivery', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Clément'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Rue des Bouchers'), NULL),
       ('Juliett Projects', FALSE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Blanc'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Shinjuku Street'), NULL),
       ('Kilo Construction', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Durand'),
        (SELECT "address_id" FROM "address" WHERE "street" = '12 Rue Lafayette'), NULL),
       ('Lima Logistics', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Martin'),
        (SELECT "address_id" FROM "address" WHERE "street" = '5th Avenue'), NULL),
       ('Mike Materials', FALSE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Dupont'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Boulevard Saint-Laurent'), NULL),
       ('November Supplies', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Morel'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Oxford Street'), NULL),
       ('Oscar Transport', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Petit'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Domkloster'), NULL),
       ('Papa Industries', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Roux'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Calle Gran Via'), NULL),
       ('Quebec Traders', FALSE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Faure'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Via Nazionale'), NULL),
       ('Romeo Aggregates', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Garnier'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Damrak'), NULL),
       ('Sierra Delivery', TRUE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Clément'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Rue des Bouchers'), NULL),
       ('Tango Projects', FALSE, (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Blanc'),
        (SELECT "address_id" FROM "address" WHERE "street" = 'Shinjuku Street'), NULL);
-- Ajout de 10 enregistrements pour la table "transport_supplier"
INSERT INTO "transport_supplier" ("company_id", "license_number")
VALUES 
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Bravo Logistics'), 'TR-LOG-0001'),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Delta Supplies'), 'TR-DEL-0002'),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'India Delivery'), 'TR-IND-0003'),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Echo Transport'), 'TR-ECHO-0004'),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Juliett Projects'), 'TR-JUL-0005'),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Alpha Construction'), 'TR-ALPHA-0006'),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Bravo Logistics'), 'TR-LOG-0007'),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Delta Supplies'), 'TR-DEL-0008'),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'India Delivery'), 'TR-IND-0009'),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Foxtrot Industries'), 'TR-FOXTROT-0010');

-- Ajout de 10 enregistrements pour la table "material_supplier"
INSERT INTO "material_supplier" ("company_id", "contact_id", "loading_address_id", "shared_details_id")
VALUES
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Charlie Materials'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Dupont'), (SELECT "address_id" FROM "address" WHERE "street" = 'Boulevard Saint-Laurent'), NULL ),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Golf Traders'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Faure'), (SELECT "address_id" FROM "address" WHERE "street" = 'Via Nazionale'), NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Hotel Aggregates'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Garnier'), (SELECT "address_id" FROM "address" WHERE "street" = 'Damrak'), NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Echo Transport'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Petit'), (SELECT "address_id" FROM "address" WHERE "street" = 'Domkloster'), NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Juliett Projects'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Blanc'), (SELECT "address_id" FROM "address" WHERE "street" = 'Shinjuku Street'), NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Alpha Construction'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Durand'), (SELECT "address_id" FROM "address" WHERE "street" = '12 Rue Lafayette'), NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Echo Transport'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Martin'), (SELECT "address_id" FROM "address" WHERE "street" = 'Oxford Street'), NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Golf Traders'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Clément'), (SELECT "address_id" FROM "address" WHERE "street" = 'Via Nazionale'), NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'India Delivery'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Garnier'), (SELECT "address_id" FROM "address" WHERE "street" = 'Rue des Bouchers'), NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Bravo Logistics'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Roux'), (SELECT "address_id" FROM "address" WHERE "street" = '5th Avenue'), NULL);

-- Insertion dans la table "customer"
INSERT INTO "customer" ("company_id", "contact_id", "shared_details_id", "date_start", "date_end", "is_solvent", "parent_id")
VALUES
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Alpha Construction'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Durand'), NULL, '2025-01-01', '2026-12-31', TRUE, NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Foxtrot Industries'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Roux'), NULL, '2025-02-01', NULL, FALSE, NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Charlie Materials'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Dupont'), NULL, '2025-03-01', '2027-03-31', TRUE, NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Delta Supplies'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Morel'), NULL, '2025-04-01', NULL, TRUE, NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Echo Transport'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Petit'), NULL, '2025-05-01', '2026-05-31', FALSE, NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Golf Traders'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Faure'), NULL, '2025-06-01', NULL, TRUE, NULL),
    ((SELECT "company_id" FROM "company" WHERE "name" = 'Hotel Aggregates'), (SELECT "contact_id" FROM "contact" WHERE "last_name" = 'Garnier'), NULL, '2025-07-01', '2027-07-31', TRUE, NULL);
-- Insertion dans la table "construction_site"
INSERT INTO "construction_site" ("address_id", "customer_id", "shared_details_id", "date_start", "date_end")
VALUES
    ((SELECT "address_id" FROM "address" WHERE "street" = 'Damrak'), (SELECT "customer_id" FROM "customer" WHERE "is_solvent" = TRUE), NULL, '2025-06-01', '2027-01-01'),
    ((SELECT "address_id" FROM "address" WHERE "street" = 'Boulevard Saint-Laurent'), (SELECT "customer_id" FROM "customer" WHERE "is_solvent" = FALSE), NULL, '2025-08-01', '2026-06-01');

-- Insertion dans la table "product"
INSERT INTO "product" ("product_code", "material_supplier_id", "shared_details_id")
VALUES
    ('PROD-A', (SELECT "material_supplier_id" FROM "material_supplier" WHERE "company_id" = (SELECT "company_id" FROM "company" WHERE "name" = 'Charlie Materials')), NULL),
    ('PROD-B', (SELECT "material_supplier_id" FROM "material_supplier" WHERE "company_id" = (SELECT "company_id" FROM "company" WHERE "name" = 'Golf Traders')), NULL);

-- Insertion dans la table "purchase_order"
INSERT INTO "purchase_order" ("billing_customer_id", "delivery_customer_id", "construction_site_id", "product_id", "quantity", "requested_delivery_date", "requested_delivery_time", "shared_details_id")
VALUES
    ((SELECT "customer_id" FROM "customer" WHERE "is_solvent" = TRUE), NULL, (SELECT "construction_site_id" FROM "construction_site" WHERE "address_id" = (SELECT "address_id" FROM "address" WHERE "street" = 'Domkloster')), (SELECT "product_id" FROM "product" WHERE "product_code" = 'PROD-A'), 100, '2026-10-15', '08:30:00', NULL);

-- Insertion dans la table "delivery_order_number"
INSERT INTO "delivery_order_number" ("transport_supplier_id", "city_id", "product_id", "unique_delivery_order_number")
VALUES
    ((SELECT "transport_supplier_id" FROM "transport_supplier" WHERE "license_number" = 'TR-LOG-0001'), (SELECT "city_id" FROM "city" WHERE "city_name" = 'Paris'), (SELECT "product_id" FROM "product" WHERE "product_code" = 'PROD-A'), 'DELIVERY-1001');

-- Insertion dans la table "delivery"
INSERT INTO "delivery" ("order_id", "transport_supplier_id", "delivery_order_number_id", "actual_delivery_date", "actual_delivery_time", "quantity", "status_id")
VALUES
    ((SELECT "order_id" FROM "purchase_order"), (SELECT "transport_supplier_id" FROM "transport_supplier" WHERE "license_number" = 'TR-LOG-0001'), (SELECT "delivery_order_number_id" FROM "delivery_order_number" WHERE "unique_delivery_order_number" = 'DELIVERY-1001'), '2026-10-16', '10:00:00', 50, (SELECT "status_id" FROM "delivery_status" WHERE "status" = 'NEW'));