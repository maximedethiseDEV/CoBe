-- Jeu de données pour le schéma PostgreSQL refactorisé

-- Insertion des pays
INSERT INTO "country" ("country_id", "country_name") VALUES
                                                         ('FRA', 'France'),
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
INSERT INTO "city" ("city_id", "city_name", "destination_code", "country_id") VALUES
                                                                                  ('059000', 'Lille', '59001', 'FRA'),
                                                                                  ('075000', 'Paris', '75001', 'FRA'),
                                                                                  ('069000', 'Lyon', '69001', 'FRA'),
                                                                                  ('033000', 'Bordeaux', '33001', 'FRA'),
                                                                                  ('001000', 'Bruxelles', '00101', 'BEL'),
                                                                                  ('002000', 'Anvers', '00201', 'BEL'),
                                                                                  ('001010', 'Amsterdam', '01001', 'NLD'),
                                                                                  ('050667', 'Cologne', '50667', 'DEU'),
                                                                                  ('028001', 'Madrid', '28001', 'ESP'),
                                                                                  ('059001', 'Lille', '59002', 'FRA'),
                                                                                  ('075001', 'Marseille', '13001', 'FRA'),
                                                                                  ('069001', 'Toulouse', '31000', 'FRA'),
                                                                                  ('033001', 'Nice', '06000', 'FRA'),
                                                                                  ('001001', 'Liège', '4000', 'BEL'),
                                                                                  ('002001', 'Gand', '9000', 'BEL'),
                                                                                  ('001011', 'Rotterdam', '01002', 'NLD'),
                                                                                  ('050668', 'Berlin', '10115', 'DEU'),
                                                                                  ('028002', 'Barcelone', '08001', 'ESP');

-- Insertion des adresses
INSERT INTO "address" ("city_id", "street") VALUES
                                                ('059000', '10 Rue de la Liberté'),
                                                ('059000', '25 Avenue des Fleurs'),
                                                ('075000', '15 Rue de Rivoli'),
                                                ('075000', '8 Avenue des Champs-Élysées'),
                                                ('069000', '42 Rue de la République'),
                                                ('033000', '3 Cours du Chapeau Rouge'),
                                                ('001000', '7 Rue Royale'),
                                                ('002000', '12 Meir'),
                                                ('001010', '9 Damrak'),
                                                ('050667', '5 Hohenzollernring'),
                                                ('028001', '18 Gran Vía'),
                                                ('059000', '14 Rue des Lilas'),
                                                ('059000', '55 Boulevard du Général Leclerc'),
                                                ('075000', '10 Avenue de la République'),
                                                ('075000', '7 Rue de la Bastille'),
                                                ('069000', '18 Rue de la Liberté'),
                                                ('069000', '24 Quai du Rhône'),
                                                ('033000', '6 Rue du Parc Bordelais'),
                                                ('033000', '11 Rue Sainte-Croix'),
                                                ('001000', '22 Rue de la Loi'),
                                                ('001000', '3 Rue des Martyrs'),
                                                ('002000', '9 Kasteelstraat'),
                                                ('002000', '4 Groenplaats'),
                                                ('001010', '21 Nieuwendijk'),
                                                ('001010', '5 Kalverstraat'),
                                                ('050667', '10 Kaiserplatz'),
                                                ('050667', '17 Aachener Strasse'),
                                                ('028001', '8 Paseo del Prado'),
                                                ('028001', '14 Calle Gran Vía'),
                                                ('059001', '3 Rue du Fort de Mons'),
                                                ('059001', '7 Rue de l’Indépendance'),
                                                ('075001', '12 Boulevard de la Corderie'),
                                                ('075001', '6 Rue de la Pépinière'),
                                                ('069001', '30 Rue des Jacobins'),
                                                ('069001', '15 Rue des Alouettes'),
                                                ('033001', '2 Place Gambetta'),
                                                ('033001', '5 Rue du Faubourg Saint-Antoine');


-- Insertion des contacts
INSERT INTO "contact" ("last_name", "first_name", "phone", "email", "role") VALUES
                                                                                ('Dupont', 'Jean', '+33612345678', 'jean.dupont@example.com', 'Site Contact'),
                                                                                ('Martin', 'Sophie', '+33687654321', 'sophie.martin@example.com', 'Dispatcher'),
                                                                                ('Dubois', 'Pierre', '+33645678912', 'pierre.dubois@example.com', 'User'),
                                                                                ('Lambert', 'Marie', '+33678912345', 'marie.lambert@example.com', 'Site Contact'),
                                                                                ('Leroy', 'Thomas', '+33623456789', 'thomas.leroy@example.com', 'Dispatcher'),
                                                                                ('Petit', 'Claire', '+33689012345', 'claire.petit@example.com', 'User'),
                                                                                ('Durand', 'Michel', '+33678901234', 'michel.durand@example.com', 'Site Contact'),
                                                                                ('Lefebvre', 'Julie', '+33667890123', 'julie.lefebvre@example.com', 'Dispatcher'),
                                                                                ('Moreau', 'Philippe', '+33656789012', 'philippe.moreau@example.com', 'User'),
                                                                                ('Garnier', 'Isabelle', '+33645678901', 'isabelle.garnier@example.com', 'Site Contact');

-- Insertion des entreprises
INSERT INTO "company" ("name", "primary_contact_id", "address_id", "attachment_path", "notes", "is_solvent") VALUES
                                                                                                                 ('Construction Moderne', 1, 1, '/attachments/cm_docs.pdf', 'Client régulier', TRUE),
                                                                                                                 ('Transport Express', 2, 2, '/attachments/te_docs.pdf', 'Partenaire de longue date', TRUE),
                                                                                                                 ('Matériaux Premium', 3, 3, '/attachments/mp_docs.pdf', 'Fournisseur principal', TRUE),
                                                                                                                 ('Bâtiment Durable', 4, 4, '/attachments/bd_docs.pdf', 'Nouveau client', TRUE),
                                                                                                                 ('Logistique Rapide', 5, 5, '/attachments/lr_docs.pdf', 'Transporteur fiable', TRUE),
                                                                                                                 ('Ciment & Béton', 6, 6, '/attachments/cb_docs.pdf', 'Fournisseur spécialisé', TRUE),
                                                                                                                 ('Grands Projets', 7, 7, '/attachments/gp_docs.pdf', 'Client important', FALSE),
                                                                                                                 ('Express Livraison', 8, 8, '/attachments/el_docs.pdf', 'Transporteur international', TRUE),
                                                                                                                 ('Agrégats Qualité', 9, 9, '/attachments/aq_docs.pdf', 'Fournisseur certifié', TRUE),
                                                                                                                 ('Constructions Urbaines', 10, 10, '/attachments/cu_docs.pdf', 'Client en croissance', TRUE);

-- Insertion des utilisateurs
INSERT INTO "user" ("username", "password_hash", "contact_id") VALUES
                                                                   ('jdupont', '$2a$12$Qw5XJH0V1c.VCGlBGYV.a.9m0.RYUtLNb1k4HUOv1Tx2kp8CjAC4y', 1),
                                                                   ('smartin', '$2a$12$ZXd89JkWeAj.HITpH5bfwua80FNqS9KHw9DHUzZE9rwQxwC49EjuK', 2),
                                                                   ('pdubois', '$2a$12$dR5.HWdI3LCB.q01.QS7e.uY9aU5mVvZgLBGgQYe.gAAvr32gBX2a', 3),
                                                                   ('mlambert', '$2a$12$kI8i3.1pj2dyUQcLG.qQbuNHBc9MaS2jXfD9L7Q5KpGo3UTZw9oty', 4),
                                                                   ('tleroy', '$2a$12$YH2mLYK17szS8AH.3Ajcce0BLv.r3HsSv5zVSxBLZS8cjrKfR3ILK', 5);

-- Insertion des fournisseurs de transport
INSERT INTO "transport_supplier" ("company_id", "license_number") VALUES
                                                                      (2, 'TR-2023-45678'),
                                                                      (5, 'TR-2023-56789'),
                                                                      (8, 'TR-2023-67890');

-- Insertion des fournisseurs de matériaux
INSERT INTO "material_supplier" ("company_id", "contact_id", "loading_address_id", "notes") VALUES
                                                                                                (3, 3, 3, 'Spécialiste en béton'),
                                                                                                (6, 6, 6, 'Fournisseur de ciment'),
                                                                                                (9, 9, 9, 'Fournisseur d''agrégats');

-- Insertion des clients
INSERT INTO "client" ("company_id", "contact_id", "delivery_address_id", "attachment_path", "notes", "start_date", "end_date") VALUES
                                                                                                                                   (1, 1, 1, '/attachments/client1.pdf', 'Projet résidentiel', '2023-03-01', '2023-12-31'),
                                                                                                                                   (4, 4, 4, '/attachments/client4.pdf', 'Projet commercial', '2023-04-15', '2024-02-28'),
                                                                                                                                   (7, 7, 7, '/attachments/client7.pdf', 'Infrastructure publique', '2023-05-10', '2024-06-30'),
                                                                                                                                   (10, 10, 10, '/attachments/client10.pdf', 'Rénovation urbaine', '2023-06-01', '2023-11-30');

-- Insertion des produits
INSERT INTO "product" ("product_id", "name", "material_supplier_id", "notes") VALUES
                                                                                  ('CIM-001', 'Ciment Portland', 1, 'Livraison par palette'),
                                                                                  ('BET-002', 'Béton prêt à l''emploi', 1, 'Chargement en ligne uniquement'),
                                                                                  ('CIM-003', 'Ciment à prise rapide', 2, 'Conditionnement spécial'),
                                                                                  ('GRA-004', 'Granulats 0/4', 3, 'En vrac'),
                                                                                  ('GRA-005', 'Granulats 4/10', 3, 'En vrac'),
                                                                                  ('SAB-006', 'Sable fin', 3, 'En vrac');

-- Insertion des commandes
INSERT INTO "orders" ("billing_client_id", "delivery_client_id", "notes", "attachment_path", "requested_delivery_date", "requested_delivery_time", "product_id", "quantity") VALUES
                                                                                                                                                                                (1, 1, 'Livraison urgente', '/attachments/order1.pdf', '2023-07-15', '09:00:00', 'CIM-001', 10),
                                                                                                                                                                                (1, 1, 'Accès difficile', '/attachments/order2.pdf', '2023-07-18', '14:00:00', 'BET-002', 20),
                                                                                                                                                                                (2, 2, 'Prévoir grue', '/attachments/order3.pdf', '2023-07-20', '10:00:00', 'CIM-003', 15),
                                                                                                                                                                                (3, 3, 'Livraison en plusieurs fois', '/attachments/order4.pdf', '2023-07-25', '08:00:00', 'GRA-004', 30),
                                                                                                                                                                                (4, 4, 'Contact sur place', '/attachments/order5.pdf', '2023-07-30', '11:00:00', 'GRA-005', 25);

-- Insertion des numéros de commande de livraison
INSERT INTO "delivery_order_number" ("delivery_order_number_id", "transport_supplier_id", "city_id", "product_id") VALUES
                                                                                                                       ('O-2023-0001', 1, '059000', 'CIM-001'),
                                                                                                                       ('O-2023-0002', 1, '059000', 'BET-002'),
                                                                                                                       ('O-2023-0003', 2, '075000', 'CIM-003'),
                                                                                                                       ('O-2023-0004', 3, '001000', 'GRA-004'),
                                                                                                                       ('O-2023-0005', 2, '028001', 'GRA-005');

-- Insertion des livraisons
INSERT INTO "delivery" ("order_id", "transport_supplier_id", "delivery_order_number_id", "actual_delivery_date", "actual_delivery_time", "status") VALUES
                                                                                                                                                       (1, 1, 'O-2023-0001', '2023-07-15', '09:30:00', 'LOADED'),
                                                                                                                                                       (2, 1, 'O-2023-0002', '2023-07-18', '14:15:00', 'DISPATCHED'),
                                                                                                                                                       (3, 2, 'O-2023-0003', '2023-07-20', NULL, 'SCHEDULED'),
                                                                                                                                                       (4, 3, 'O-2023-0004', NULL, NULL, 'NEW'),
                                                                                                                                                       (5, 2, 'O-2023-0005', NULL, NULL, 'NEW');

-- Insertion des archives de livraison
INSERT INTO "delivery_archive" ("order_id", "transport_supplier_id", "delivery_order_number_id", "actual_delivery_date", "actual_delivery_time", "status") VALUES
                                                                                                                                                               (1, 1, 'O-2023-0001', '2023-07-15', '09:30:00', 'Loaded'),
                                                                                                                                                               (2, 1, 'O-2023-0002', '2023-07-18', '14:15:00', 'Loaded');

-- Insertion des chantiers
INSERT INTO "construction_site" ("client_id", "address_id") VALUES
                                                                (1, 1),
                                                                (2, 4),
                                                                (3, 7),
                                                                (4, 10);