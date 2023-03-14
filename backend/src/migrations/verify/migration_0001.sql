-- Verify migration_0001:migration_0001 on pg

BEGIN;

INSERT INTO "todo" ("title", "description") VALUES ('test', 'commentaire');


ROLLBACK;
