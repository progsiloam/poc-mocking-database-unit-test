-- To enable CITEXT
CREATE EXTENSION CITEXT;

CREATE TABLE "trx"."roles" (
    "id" INT PRIMARY KEY NOT NULL,
    "description" VARCHAR(30) NOT NULL
);

INSERT INTO trx.roles (id, description)
VALUES
(1, 'Admin'),
(2, 'User');

CREATE TABLE "trx"."users" (
    "id" BIGINT PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    "username" VARCHAR(15) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role_id" INT NOT NULL,
    "email" CITEXT,
    "fullname" CITEXT,
    "address" CITEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT FALSE,
    "created_by" VARCHAR(15) NOT NULL,
    "created_on" TIMESTAMP NOT NULL,
    "modified_by" VARCHAR(15) NOT NULL,
    "modified_on" TIMESTAMP NOT NULL
);

ALTER TABLE "trx"."users" ADD CONSTRAINT unique_username UNIQUE ("username");

CREATE TABLE "trx"."refresh_tokens" (
	"username" VARCHAR(15) PRIMARY KEY NOT NULL,
	"token" UUID NOT NULL,
	"expired" TIMESTAMP NOT NULL
);
