
-- CITY (5 villes du Nord, reliées à la France)
INSERT INTO "city" ("postal_code", "city_name", "country_id")
SELECT v.postal_code, v.city_name, c.id
FROM (
         VALUES
             ('7530','Gaurain-Ramecroix')
             ('59000', 'Lille'),
             ('59100', 'Roubaix'),
             ('59200', 'Tourcoing'),
             ('59650', 'Villeneuve-d’Ascq'),
             ('59140', 'Dunkerque')
     ) AS v(postal_code, city_name)
         JOIN "country" c ON c.country_code = 'FR';

-- ADDRESS (5 adresses, dont 2 dans Lille)
INSERT INTO "address" ("street", "city_id")
SELECT v.street, ci.id
FROM (
         VALUES
             ('260 Grand''Route','Gaurain-Ramecroix')
             ('12 Rue Nationale', 'Lille'),
             ('34 Avenue de la Liberté', 'Lille'),
             ('56 Rue Jean Jaurès', 'Roubaix'),
             ('78 Boulevard Gambetta', 'Tourcoing'),
             ('90 Rue de la Marine', 'Dunkerque')
     ) AS v(street, city_name)
         JOIN "city" ci ON ci.city_name = v.city_name;

-- COMPANY (5 sociétés, dont transporteur, fournisseur, client)
INSERT INTO "company" ("name", "code_as400", "code_sap", "commercially_active", "address_id")
SELECT v.name, v.code_as400, v.code_sap, v.active, a.id
FROM (
         VALUES
             ('Nord Transport', 'T001', 'SAP-T001', TRUE, '12 Rue Nationale'),
             ('Beton Fournitures', 'F001', 'SAP-F001', TRUE, '34 Avenue de la Liberté'),
             ('Chantier Services', 'C001', 'SAP-C001', TRUE, '56 Rue Jean Jaurès'),
             ('Alpha Conseil', 'X001', 'SAP-X001', TRUE, '78 Boulevard Gambetta'),
             ('Omega Energies', 'X002', 'SAP-X002', FALSE, '90 Rue de la Marine')
     ) AS v(name, code_as400, code_sap, active, street)
         JOIN "address" a ON a.street = v.street;

-- TRANSPORT SUPPLIER (lié à Nord Transport)
INSERT INTO "transport_supplier" ("license_number", "company_id")
SELECT 'LIC-TRANS-001', c.id
FROM "company" c
WHERE c.name = 'Nord Transport';

-- MATERIAL SUPPLIER (lié à Beton Fournitures)
INSERT INTO "material_supplier" ("company_id", "loading_address_id")
SELECT c.id, a.id
FROM "company" c
         JOIN "address" a ON a.street = '34 Avenue de la Liberté'
WHERE c.name = 'Beton Fournitures';

-- CUSTOMER (lié à Chantier Services)
INSERT INTO "customer" ("company_id", "date_start", "is_solvent")
SELECT c.id, '2025-01-01', TRUE
FROM "company" c
WHERE c.name = 'Chantier Services';

-- CONSTRUCTION SITE (lié au customer Chantier Services)
INSERT INTO "construction_site" ("date_start", "date_end", "customer_id", "address_id")
SELECT '2025-09-01', '2026-09-01', cust.id, a.id
FROM "customer" cust
         JOIN "company" c ON cust.company_id = c.id
         JOIN "address" a ON a.street = '56 Rue Jean Jaurès'
WHERE c.name = 'Chantier Services';

-- PRODUCT (2 produits liés à Beton Fournitures)
INSERT INTO "product" ("code_as400", "code_sap", "name_short", "name_long", "category", "material_supplier_id")
SELECT v.code_as400, v.code_sap, v.name_short, v.name_long, v.category, ms.id
FROM (
         VALUES
             ('P001', 'SAP-P001', 'CEMI', 'Ciment Portland CEM I 42.5 N', 'MAT', 'Beton Fournitures'),
             ('P002', 'SAP-P002', 'GRAV', 'Granulat 6/20 concassé', 'MAT', 'Beton Fournitures')
     ) AS v(code_as400, code_sap, name_short, name_long, category, company_name)
         JOIN "company" c ON c.name = v.company_name
         JOIN "material_supplier" ms ON ms.company_id = c.id;

-- PURCHASE ORDER (3 commandes dans la semaine du 22/09 au 26/09)
INSERT INTO "purchase_order" ("quantity", "requested_delivery_begin", "requested_delivery_end", "customer_id", "construction_site_id", "product_id")
SELECT v.quantity, v.begin_date, v.end_date, cust.id, cs.id, p.id
FROM (
         VALUES
             (50, TIMESTAMPTZ '2025-09-22 08:00:00+02', TIMESTAMPTZ '2025-09-22 17:00:00+02', 'P001'),
             (75, TIMESTAMPTZ '2025-09-24 09:00:00+02', TIMESTAMPTZ '2025-09-24 16:00:00+02', 'P002'),
             (100, TIMESTAMPTZ '2025-09-26 08:30:00+02', TIMESTAMPTZ '2025-09-26 15:30:00+02', 'P001')
     ) AS v(quantity, begin_date, end_date, product_code)
         JOIN "product" p ON p.code_as400 = v.product_code
         JOIN "customer" cust ON cust.id IS NOT NULL
         JOIN "construction_site" cs ON cs.customer_id = cust.id;
