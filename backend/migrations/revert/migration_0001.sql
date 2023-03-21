-- Revert todo:migration_0001 from pg

BEGIN;

DROP TABLE IF EXISTS "product_user", "product", "image", "user", "role";

COMMIT;
