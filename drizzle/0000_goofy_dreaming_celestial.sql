CREATE TABLE IF NOT EXISTS "paste" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"edit_key" text NOT NULL,
	"created_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp (0) with time zone
);
