-- Deploy todo:migration_0001 to pg

BEGIN;

CREATE TABLE "role" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "role" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL,
  "role" SMALLINT NOT NULL REFERENCES "role"("id") ON DELETE CASCADE,
  "password" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "image" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "image_base64" TEXT NOT NULL,
  "mime_type" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "product" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "image_id" INTEGER NOT NULL REFERENCES "image"("id") ON DELETE CASCADE,
  "open_date" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "relation" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "friend_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "is_accepted" BOOLEAN NOT NULL DEFAULT FALSE,
  "is_new" BOOLEAN NOT NULL DEFAULT TRUE, 
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "product_user" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "product_id" INTEGER NOT NULL REFERENCES "product"("id") ON DELETE CASCADE,
  "owner_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE "friend_user" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "friend_id" INTEGER NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "friend_name" TEXT NOT NULL,
  "relation_id" INTEGER NOT NULL REFERENCES "relation"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updated_at" TIMESTAMPTZ
);



COMMIT;
