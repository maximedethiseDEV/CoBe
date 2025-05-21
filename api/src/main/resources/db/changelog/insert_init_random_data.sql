-- Insertion des pays
INSERT INTO "country" ("country_code", "country_name")
VALUES ('FRA', 'France'),
       ('BEL', 'Belgique'),
       ('NLD', 'Pays-Bas'),
       ('DEU', 'Allemagne'),
       ('ESP', 'Espagne'),
       ('ITA', 'Italie'),
       ('GBR', 'Royaume-Uni'),
       ('USA', 'États-Unis'),
       ('CAN', 'Canada'),
       ('JPN', 'Japon');

-- Insertion des villes
INSERT INTO "city" ("postal_code", "city_name", "country_id")
VALUES ('59000', 'Lille', 1),
       ('75000', 'Paris', 1),
       ('69000', 'Lyon', 1),
       ('33000', 'Bordeaux', 1),
       ('00100', 'Bruxelles', 2),
       ('20000', 'Anvers', 2),
       ('10100', 'Amsterdam', 3),
       ('50667', 'Cologne', 4),
       ('28001', 'Madrid', 5);

-- Insertion des adresses
INSERT INTO "address" ("address_id", "city_id", "street")
VALUES (1, 1, '10 Rue de la Liberté'),
       (2, 2, '15 Rue de Rivoli'),
       (3, 3, '42 Rue de la République'),
       (4, 4, '3 Cours du Chapeau Rouge'),
       (5, 5, '7 Rue Royale'),
       (6, 6, '12 Meir'),
       (7, 7, '9 Damrak'),
       (8, 8, '5 Hohenzollernring'),
       (9, 9, '18 Gran Vía');

-- Insertion dans la table "shared_details"
INSERT INTO "shared_details" ("attachment_path", "notes")
VALUES ('/files/shared_details1.pdf', 'Shared details information.'),
       ('/files/shared_details2.pdf', 'Second shared details entry.');

-- Insertion des status de livraisons
INSERT INTO delivery_status (status) VALUES
                                         ('NEW'),
                                         ('SCHEDULED'),
                                         ('DISPATCHED'),
                                         ('LOADED');

-- Insertion des contacts
INSERT INTO "contact" ("contact_id", "last_name", "first_name", "phone", "email", "role")
VALUES (1, 'Dupont', 'Jean', '+33612345678', 'jean.dupont@example.com', 'Site Contact'),
       (2, 'Martin', 'Sophie', '+33687654321', 'sophie.martin@example.com', 'Dispatcher'),
       (3, 'Dubois', 'Pierre', '+33645678912', 'pierre.dubois@example.com', 'User'),
       (4, 'Lambert', 'Marie', '+33678912345', 'marie.lambert@example.com', 'Site Contact'),
       (5, 'Leroy', 'Thomas', '+33623456789', 'thomas.leroy@example.com', 'Dispatcher'),
       (6, 'Petit', 'Claire', '+33689012345', 'claire.petit@example.com', 'User'),
       (7, 'Durand', 'Michel', '+33678901234', 'michel.durand@example.com', 'Site Contact'),
       (8, 'Lefebvre', 'Julie', '+33667890123', 'julie.lefebvre@example.com', 'Dispatcher'),
       (9, 'Moreau', 'Philippe', '+33656789012', 'philippe.moreau@example.com', 'User'),
       (10, 'Garnier', 'Isabelle', '+33645678901', 'isabelle.garnier@example.com', 'Site Contact');

-- Insertion des utilisateurs
INSERT INTO "dbuser" ("user_id", "username", "password_hash", "contact_id", "permission")
VALUES (1, 'jdupont', '$2a$12$Qw5XJH0V1c.VCGlBGYV.a.9m0.RYUtLNb1k4HUOv1Tx2kp8CjAC4y', 1, 'USER'),
       (2, 'smartin', '$2a$12$ZXd89JkWeAj.HITpH5bfwua80FNqS9KHw9DHUzZE9rwQxwC49EjuK', 2, 'USER'),
       (3, 'pdubois', '$2a$12$dR5.HWdI3LCB.q01.QS7e.uY9aU5mVvZgLBGgQYe.gAAvr32gBX2a', 3, 'USER'),
       (4, 'mlambert', '$2a$12$kI8i3.1pj2dyUQcLG.qQbuNHBc9MaS2jXfD9L7Q5KpGo3UTZw9oty', 4, 'USER'),
       (5, 'tleroy', '$2a$12$YH2mLYK17szS8AH.3Ajcce0BLv.r3HsSv5zVSxBLZS8cjrKfR3ILK', 5, 'USER');

-- Insertion des entreprises
INSERT INTO "company" ("company_id", "name", "commercially_active", "primary_contact_id", "address_id",
                       "shared_details_id")
VALUES (1, 'Construction Moderne', TRUE, 1, 1, NULL),
       (2, 'Transport Express', TRUE, 2, 2, NULL),
       (3, 'Matériaux Premium', TRUE, 3, 3, NULL),
       (4, 'Bâtiment Durable', TRUE, 4, 4, NULL),
       (5, 'Logistique Rapide', TRUE, 5, 5, NULL),
       (6, 'Ciment & Béton', TRUE, 6, 6, NULL),
       (7, 'Grands Projets', FALSE, 7, 7, NULL),
       (8, 'Express Livraison', TRUE, 8, 8, NULL),
       (9, 'Agrégats Qualité', TRUE, 9, 9, NULL),
       (10, 'Constructions Urbaines', TRUE, 10, NULL, NULL);

-- Insertion des fournisseurs de transport
INSERT INTO "transport_supplier" ("transport_supplier_id", "company_id", "license_number")
VALUES (1, 2, 'TR-2023-45678'),
       (2, 5, 'TR-2023-56789'),
       (3, 8, 'TR-2023-67890');

-- Insertion des fournisseurs de matériaux
INSERT INTO "material_supplier" ("material_supplier_id", "company_id", "contact_id", "loading_address_id", "notes")
VALUES (1, 3, 3, 3, 'Spécialiste en béton'),
       (2, 6, 6, 6, 'Fournisseur de ciment'),
       (3, 9, 9, 9, 'Fournisseur d''agrégats');

-- Insertion des clients
INSERT INTO "customer" ("customer_id", "company_id", "contact_id", "delivery_address_id", "attachment_path", "notes",
                        "date_start", "date_end", "is_solvent", "parent_id")
VALUES (1, 1, 1, 1, '/attachments/customer1.pdf', 'Projet résidentiel', '2023-03-01', '2023-12-31', TRUE, NULL),
       (2, 4, 4, 4, '/attachments/customer4.pdf', 'Projet commercial', '2023-04-15', '2024-02-28', TRUE, NULL);

-- Insertion dans la table "construction_site"
INSERT INTO "construction_site" ("customer_id", "address_id", "date_start", "date_end")
VALUES (1, 1, '2023-06-01', '2024-12-31'),
       (2, 4, '2024-01-01', NULL);

-- Insertion dans la table "product"
INSERT INTO "product" ("name", "material_supplier_id", "notes")
VALUES ('Cement', 1, 'High-strength cement for construction projects.'),
       ('Aggregates', 1, 'High-quality aggregates for concrete production.');

-- Insertion dans la table "orders"
INSERT INTO "orders" ("billing_customer_id", "delivery_customer_id", "product_id", "quantity",
                      "requested_delivery_date")
VALUES (1, 2, 1, 1000, '2024-05-01'),
       (1, 2, 2, 500, '2024-05-15');

-- Insertion dans la table "delivery_order_number"
INSERT INTO "delivery_order_number" ("transport_supplier_id", "city_id", "product_id", "unique_delivery_order_number")
VALUES (1, 1, 1, 'DELIVERY-001'),
       (2, 3, 2, 'DELIVERY-002');

-- Insertion dans la table "delivery"
INSERT INTO "delivery" ("order_id", "transport_supplier_id", "delivery_order_number_id", "quantity", "status_id")
VALUES (1, 1, 1, 150, 1),
       (2, 2, 2, 500, 2);