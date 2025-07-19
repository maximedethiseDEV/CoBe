CREATE OR REPLACE FUNCTION check_parent_solvency()
RETURNS TRIGGER AS $$
BEGIN
    -- Vérifie si le parent est solvable
    IF NEW.parent_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1
            FROM customer
            WHERE id = NEW.parent_id AND is_solvent = TRUE
        ) AND NEW.is_solvent = TRUE THEN
            RAISE EXCEPTION 'Customer is not solvent because parent is not solvent';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trig_check_parent_solvency
BEFORE INSERT OR UPDATE ON customer
FOR EACH ROW
EXECUTE FUNCTION check_parent_solvency();