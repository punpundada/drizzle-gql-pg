CREATE TABLE IF NOT EXISTS "districts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"state_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "states" DROP CONSTRAINT "states_country_id_countries_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "states" ADD CONSTRAINT "states_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "districts" ADD CONSTRAINT "districts_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "states"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
