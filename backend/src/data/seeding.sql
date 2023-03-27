BEGIN;

INSERT INTO "role" ("role", "updated_at") VALUES 
  ('user', now()),
  ('admin', now()); 
  
COMMIT;