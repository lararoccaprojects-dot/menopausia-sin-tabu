CREATE TABLE `hotmart_transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`hotmartTransactionId` varchar(255),
	`productId` varchar(255) NOT NULL,
	`productName` varchar(255) NOT NULL,
	`price` int NOT NULL,
	`currency` varchar(10) DEFAULT 'USD',
	`status` enum('pending','completed','refunded','failed') DEFAULT 'pending',
	`buyerName` varchar(255),
	`buyerEmail` varchar(320),
	`paymentMethod` varchar(100),
	`rawWebhookData` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hotmart_transactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `hotmart_transactions_hotmartTransactionId_unique` UNIQUE(`hotmartTransactionId`)
);
--> statement-breakpoint
ALTER TABLE `hotmart_transactions` ADD CONSTRAINT `hotmart_transactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;