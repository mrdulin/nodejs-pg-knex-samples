CREATE OR REPLACE FUNCTION log_last_name_changes() RETURNS trigger AS 

$BODY$
BEGIN
  IF NEW.last_name <> OLD.last_name THEN
  INSERT INTO employee_audits(employee_id, last_name, changed_on)
  VALUES(OLD.id, OLD.last_name, NOW());
  END IF;

  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql VOLATILE