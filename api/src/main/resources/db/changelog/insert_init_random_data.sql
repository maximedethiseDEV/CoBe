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

--- Insertion dans la table "city"
INSERT INTO "city" ("postal_code", "city_name", "country_id")
SELECT
    v.postal_code,
    v.city_name,
    c.id as country_id
FROM (
         VALUES
             ('75000', 'Paris', 'FRA'),
             ('10001', 'New York', 'USA'),
             ('H1A0A1', 'Montreal', 'CAN'),
             ('WC2N', 'Londres', 'GBR'),
             ('50667', 'Cologne', 'DEU'),
             ('28001', 'Madrid', 'ESP'),
             ('00184', 'Rome', 'ITA'),
             ('1011AA', 'Amsterdam', 'NLD'),
             ('1000', 'Bruxelles', 'BEL'),
             ('100001', 'Tokyo', 'JPN')
     ) as v(postal_code, city_name, country_code)
         JOIN "country" c ON c.country_code = v.country_code;

-- Insertion dans la table "address"
INSERT INTO "address" ("city_id", "street")
SELECT
    c.id as city_id,
    v.street
FROM (
         VALUES
             ('Paris', '12 Rue Lafayette'),
             ('New York', '5th Avenue'),
             ('Montreal', 'Boulevard Saint-Laurent'),
             ('Londres', 'Oxford Street'),
             ('Cologne', 'Domkloster'),
             ('Madrid', 'Calle Gran Via'),
             ('Rome', 'Via Nazionale'),
             ('Amsterdam', 'Damrak'),
             ('Bruxelles', 'Rue des Bouchers'),
             ('Tokyo', 'Shinjuku Street')
     ) as v(city_name, street)
         JOIN "city" c ON c.city_name = v.city_name;

-- Insertion dans la table "shared_details"
INSERT INTO "shared_details" ("attachment_path", "notes")
VALUES
    ('/files/shared1.pdf', 'Détails partagés 1'),
    ('/files/shared2.pdf', 'Détails partagés 2'),
    ('/files/shared3.pdf', 'Détails partagés 3'),
    ('/files/shared4.pdf', 'Détails partagés 4'),
    ('/files/shared5.pdf', 'Détails partagés 5');

-- Insertion dans la table "contact"
INSERT INTO "contact" ("last_name", "first_name", "phone", "email", "role")
VALUES
    ('Durand', 'Alice', '+33123456789', 'alice.durand@example.com', 'Admin'),
    ('Martin', 'Bob', '+33234567890', 'bob.martin@example.com', 'Manager'),
    ('Dupont', 'Eve', '+33345678901', 'eve.dupont@example.com', 'User'),
    ('Morel', 'Charlie', '+33456789012', 'charlie.morel@example.com', 'Dispatcher'),
    ('Petit', 'Diane', '+33567890123', 'diane.petit@example.com', 'Driver');

-- Insertion dans la table "company"
INSERT INTO "company" ("name", "commercially_active", "contact_id", "address_id")
SELECT
    v.name,
    v.commercially_active,
    c.id as contact_id,
    a.id as address_id
FROM (
         VALUES
             ('Alpha Construction', true, 'Durand', '12 Rue Lafayette'),
             ('Bravo Logistics', true, 'Martin', '5th Avenue'),
             ('Charlie Materials', true, 'Dupont', 'Boulevard Saint-Laurent'),
             ('Delta Supplies', true, 'Morel', 'Oxford Street'),
             ('Echo Transport', false, 'Petit', 'Domkloster')
     ) as v(name, commercially_active, contact_last_name, street)
         JOIN "contact" c ON c.last_name = v.contact_last_name
         JOIN "address" a ON a.street = v.street;

-- Insertion dans la table "transport_supplier"
INSERT INTO "transport_supplier" ("company_id", "license_number")
SELECT
    c.id as company_id,
    v.license_number
FROM (
         VALUES
             ('Bravo Logistics', 'TR-LOG-0001'),
             ('Delta Supplies', 'TR-DEL-0002'),
             ('Echo Transport', 'TR-ECHO-0003')
     ) as v(company_name, license_number)
         JOIN "company" c ON c.name = v.company_name;

-- Insertion dans la table "material_supplier"
INSERT INTO "material_supplier" ("company_id", "contact_id", "loading_address_id")
SELECT
    c.id as company_id,
    ct.id as contact_id,
    a.id as loading_address_id
FROM (
         VALUES
             ('Charlie Materials', 'Dupont', 'Boulevard Saint-Laurent'),
             ('Delta Supplies', 'Morel', 'Oxford Street')
     ) as v(company_name, contact_last_name, street)
         JOIN "company" c ON c.name = v.company_name
         JOIN "contact" ct ON ct.last_name = v.contact_last_name
         JOIN "address" a ON a.street = v.street;

-- Insertion dans la table "customer"
INSERT INTO "customer" ("company_id", "contact_id", "date_start", "date_end", "is_solvent")
SELECT
    c.id as company_id,
    ct.id as contact_id,
    v.date_start::date,
    v.date_end::date,
    v.is_solvent
FROM (
         VALUES
             ('Alpha Construction', 'Durand', '2025-01-01', '2026-12-31', true),
             ('Bravo Logistics', 'Martin', '2025-02-01', NULL, true),
             ('Charlie Materials', 'Dupont', '2025-03-01', '2027-03-31', false)
     ) as v(company_name, contact_last_name, date_start, date_end, is_solvent)
         JOIN "company" c ON c.name = v.company_name
         JOIN "contact" ct ON ct.last_name = v.contact_last_name;

-- Insertion dans la table "construction_site"
INSERT INTO "construction_site" ("address_id", "customer_id", "date_start", "date_end")
SELECT
    a.id as address_id,
    cust.id as customer_id,
    v.date_start::date,
    v.date_end::date
FROM (
         VALUES
             ('12 Rue Lafayette', 'Alpha Construction', '2025-06-01', '2027-01-01'),
             ('5th Avenue', 'Bravo Logistics', '2025-08-01', '2026-06-01')
     ) as v(street, company_name, date_start, date_end)
         JOIN "address" a ON a.street = v.street
         JOIN "company" c ON c.name = v.company_name
         JOIN "customer" cust ON cust.company_id = c.id;

-- Insertion dans la table "product"
INSERT INTO "product" ("product_code", "material_supplier_id")
SELECT
    v.product_code,
    ms.id as material_supplier_id
FROM (
         VALUES
             ('PROD-A', 'Charlie Materials'),
             ('PROD-B', 'Delta Supplies')
     ) as v(product_code, company_name)
         JOIN "company" c ON c.name = v.company_name
         JOIN "material_supplier" ms ON ms.company_id = c.id;


-- Insertion dans la table "purchase_order"
INSERT INTO "purchase_order" (
    "billing_customer_id",
    "delivery_customer_id",
    "construction_site_id",
    "product_id",
    "quantity",
    "requested_delivery_date",
    "requested_delivery_time"
)
SELECT
    bc.id as billing_customer_id,
    dc.id as delivery_customer_id,
    cs.id as construction_site_id,
    p.id as product_id,
    v.quantity,
    CAST(v.req_date AS date),
    CAST(v.req_time AS time)
FROM (
         VALUES
             ('Alpha Construction', 'Bravo Logistics', '12 Rue Lafayette', 'PROD-A', 100, '2025-10-15', '08:30:00'),
             ('Bravo Logistics', 'Charlie Materials', '5th Avenue', 'PROD-B', 150, '2025-11-01', '09:00:00')
     ) as v(billing_company, delivery_company, site_street, product_code, quantity, req_date, req_time)
         JOIN "company" bc_comp ON bc_comp.name = v.billing_company
         JOIN "customer" bc ON bc.company_id = bc_comp.id
         JOIN "company" dc_comp ON dc_comp.name = v.delivery_company
         JOIN "customer" dc ON dc.company_id = dc_comp.id
         JOIN "address" a ON a.street = v.site_street
         JOIN "construction_site" cs ON cs.address_id = a.id
         JOIN "product" p ON p.product_code = v.product_code;

-- Insertion dans la table "delivery_order_number"
INSERT INTO "delivery_order_number" (
    "transport_supplier_id",
    "customer_id",
    "city_id",
    "product_id",
    "unique_delivery_order_number"
)
SELECT
    ts.id as transport_supplier_id,
    cust.id as customer_id,
    city.id as city_id,
    p.id as product_id,
    v.delivery_number
FROM (
         VALUES
             ('Bravo Logistics', 'Alpha Construction', 'Paris', 'PROD-A', 'DELIVERY-1001'),
             ('Delta Supplies', 'Charlie Materials', 'New York', 'PROD-B', 'DELIVERY-1002')
     ) as v(transport_company, customer_company, city_name, product_code, delivery_number)
         JOIN "company" tc ON tc.name = v.transport_company
         JOIN "transport_supplier" ts ON ts.company_id = tc.id
         JOIN "company" cc ON cc.name = v.customer_company
         JOIN "customer" cust ON cust.company_id = cc.id
         JOIN "city" city ON city.city_name = v.city_name
         JOIN "product" p ON p.product_code = v.product_code;

-- Insertion dans la table "delivery"
INSERT INTO "delivery" (
    "order_id",
    "transport_supplier_id",
    "delivery_order_number_id",
    "actual_delivery_date",
    "actual_delivery_time",
    "quantity",
    "status_id"
)
SELECT
    po.id as order_id,
    ts.id as transport_supplier_id,
    don.id as delivery_order_number_id,
    CAST(v.actual_date AS date),
    CAST(v.actual_time AS time),
    v.quantity,
    ds.id as status_id
FROM (
         VALUES
             ('Alpha Construction', 'PROD-A', 'Bravo Logistics', 'DELIVERY-1001', '2025-10-16', '10:00:00', 50, 'NEW'),
             ('Bravo Logistics', 'PROD-B', 'Delta Supplies', 'DELIVERY-1002', '2025-11-02', '14:30:00', 75, 'IN_PROGRESS')
     ) as v(customer_company, product_code, transport_company, delivery_number, actual_date, actual_time, quantity, status)
         JOIN "company" cc ON cc.name = v.customer_company
         JOIN "customer" cust ON cust.company_id = cc.id
         JOIN "product" p ON p.product_code = v.product_code
         JOIN "purchase_order" po ON po.billing_customer_id = cust.id AND po.product_id = p.id
         JOIN "company" tc ON tc.name = v.transport_company
         JOIN "transport_supplier" ts ON ts.company_id = tc.id
         JOIN "delivery_order_number" don ON don.unique_delivery_order_number = v.delivery_number
         JOIN "delivery_status" ds ON ds.status = v.status;