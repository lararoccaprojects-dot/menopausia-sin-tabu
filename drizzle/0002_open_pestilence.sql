CREATE TABLE `symptomReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`reportDate` timestamp NOT NULL DEFAULT (now()),
	`totalSymptoms` int NOT NULL,
	`averageSeverity` int NOT NULL,
	`mostCommonCategory` varchar(100),
	`recommendations` text,
	`trend` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `symptomReports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `symptoms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`severity` int NOT NULL DEFAULT 1,
	`commonality` int NOT NULL DEFAULT 50,
	`recommendations` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `symptoms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userSymptoms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`symptomId` int NOT NULL,
	`severity` int NOT NULL,
	`frequency` varchar(50) NOT NULL,
	`notes` text,
	`recordedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userSymptoms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `symptomReports` ADD CONSTRAINT `symptomReports_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSymptoms` ADD CONSTRAINT `userSymptoms_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `userSymptoms` ADD CONSTRAINT `userSymptoms_symptomId_symptoms_id_fk` FOREIGN KEY (`symptomId`) REFERENCES `symptoms`(`id`) ON DELETE no action ON UPDATE no action;