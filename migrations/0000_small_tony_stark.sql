CREATE TABLE `pastes` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`expiration_ttl` integer DEFAULT 604800 NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);
