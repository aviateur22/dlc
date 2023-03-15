-- Revert todo:migration_0001 from pg

BEGIN;

DROP TABLE "user";

COMMIT;
