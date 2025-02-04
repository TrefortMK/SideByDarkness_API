-- CreateTable
CREATE TABLE `Type` (
    `type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(50) NULL,

    PRIMARY KEY (`type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `skill_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`skill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Buff` (
    `buff_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`buff_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Debuff` (
    `debuff_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_id` INTEGER NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `amount` INTEGER NOT NULL,

    PRIMARY KEY (`debuff_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `base_stat_id` INTEGER NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemBuff` (
    `item_id` INTEGER NOT NULL,
    `buff_id` INTEGER NOT NULL,

    PRIMARY KEY (`item_id`, `buff_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemDebuff` (
    `item_id` INTEGER NOT NULL,
    `debuff_id` INTEGER NOT NULL,

    PRIMARY KEY (`item_id`, `debuff_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Weapon` (
    `weapon_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `damage` INTEGER NOT NULL,
    `critical_chance` DOUBLE NOT NULL,

    PRIMARY KEY (`weapon_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeaponBuff` (
    `weapon_id` INTEGER NOT NULL,
    `buff_id` INTEGER NOT NULL,

    PRIMARY KEY (`weapon_id`, `buff_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeaponDebuff` (
    `weapon_id` INTEGER NOT NULL,
    `debuff_id` INTEGER NOT NULL,

    PRIMARY KEY (`weapon_id`, `debuff_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeaponEnhancement` (
    `weapon_id` INTEGER NOT NULL,
    `enhancement` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`weapon_id`, `enhancement`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `player_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(30) NOT NULL,
    `profile_picture` LONGBLOB NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `best_score` INTEGER NOT NULL,
    `best_runtime` INTEGER NOT NULL,
    `playtime` INTEGER NOT NULL,
    `savedata` LONGBLOB NOT NULL,

    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `Type`(`type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Buff` ADD CONSTRAINT `Buff_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `Type`(`type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Debuff` ADD CONSTRAINT `Debuff_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `Type`(`type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemBuff` ADD CONSTRAINT `ItemBuff_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemBuff` ADD CONSTRAINT `ItemBuff_buff_id_fkey` FOREIGN KEY (`buff_id`) REFERENCES `Buff`(`buff_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemDebuff` ADD CONSTRAINT `ItemDebuff_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemDebuff` ADD CONSTRAINT `ItemDebuff_debuff_id_fkey` FOREIGN KEY (`debuff_id`) REFERENCES `Debuff`(`debuff_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeaponBuff` ADD CONSTRAINT `WeaponBuff_weapon_id_fkey` FOREIGN KEY (`weapon_id`) REFERENCES `Weapon`(`weapon_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeaponBuff` ADD CONSTRAINT `WeaponBuff_buff_id_fkey` FOREIGN KEY (`buff_id`) REFERENCES `Buff`(`buff_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeaponDebuff` ADD CONSTRAINT `WeaponDebuff_weapon_id_fkey` FOREIGN KEY (`weapon_id`) REFERENCES `Weapon`(`weapon_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeaponDebuff` ADD CONSTRAINT `WeaponDebuff_debuff_id_fkey` FOREIGN KEY (`debuff_id`) REFERENCES `Debuff`(`debuff_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeaponEnhancement` ADD CONSTRAINT `WeaponEnhancement_weapon_id_fkey` FOREIGN KEY (`weapon_id`) REFERENCES `Weapon`(`weapon_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
