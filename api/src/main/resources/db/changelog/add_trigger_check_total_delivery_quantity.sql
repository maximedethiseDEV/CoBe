-- Description:
-- Ce trigger vérifie que la quantité totale des livraisons d'une commande
-- (existantes + nouvelle) ne dépasse pas la quantité initialement commandée.
-- Il est déclenché avant INSERT ou UPDATE sur la table delivery
-- et lève une exception si la limite est dépassée.
--
-- Date de création: 11/06/2025

CREATE OR REPLACE FUNCTION check_total_delivery_quantity()
RETURNS TRIGGER AS $$
DECLARE
    existingDeliveryQuantity INTEGER;
    orderRequestedQuantity   INTEGER;
BEGIN
    -- Calculer la somme des quantités livrées pour l'identifiant de commande donné
    SELECT COALESCE(SUM(quantity), 0)
    INTO existingDeliveryQuantity
    FROM delivery
    WHERE order_id = NEW.order_id;

    -- Récupérer la quantité demandée pour la commande
    SELECT quantity
    INTO orderRequestedQuantity
    FROM purchase_order
    WHERE id = NEW.order_id;

    -- Vérifier si la quantité totale dépasse la limite demandée
    IF (existingDeliveryQuantity + NEW.quantity) > orderRequestedQuantity THEN
        -- Plutôt que d'utiliser une constante, on insère directement le message
        RAISE EXCEPTION 'La quantité totale des livraisons dépasse la quantité demandée pour la commande %', NEW.order_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Création du trigger
CREATE TRIGGER delivery_quantity_check
    BEFORE INSERT OR UPDATE ON delivery
    FOR EACH ROW
EXECUTE FUNCTION check_total_delivery_quantity();