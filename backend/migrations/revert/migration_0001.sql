-- Revert migration_0001:migration_0001 from pg

BEGIN;

  DROP TABLE "todo";

COMMIT;
