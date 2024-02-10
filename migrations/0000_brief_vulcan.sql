CREATE TABLE `pastes` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`url` text,
	`expiresAt` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pastes_id_unique` ON `pastes` (`id`);