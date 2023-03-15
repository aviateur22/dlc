-- Verify todo:migration_0001 on pg

BEGIN;

INSERT INTO "user" ("email", "password", "createdAt", "updatedAt") VALUES ('test', 'test', now(), now());

ROLLBACK;
