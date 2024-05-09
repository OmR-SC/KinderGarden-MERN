-- CreateTable
CREATE TABLE `alergias` (
    `Infante_id` INTEGER NOT NULL,
    `Ingrediente_id` INTEGER NOT NULL,

    INDEX `Infante_id`(`Infante_id`),
    INDEX `Ingrediente_id`(`Ingrediente_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `autorizaciones` (
    `Representante_id` INTEGER NULL,
    `Infante_id` INTEGER NULL,
    `Autorizado` BOOLEAN NULL,

    INDEX `Representante_id`(`Representante_id`),
    UNIQUE INDEX `authUnique`(`Infante_id`, `Representante_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direcciones` (
    `Direccion_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Municipio` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`Direccion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `infantes` (
    `Infantes_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Matricula` INTEGER NOT NULL,
    `Nombre` VARCHAR(20) NULL,
    `A_Paterno` VARCHAR(20) NULL,
    `A_Materno` VARCHAR(20) NULL,
    `Fecha_nacimiento` DATE NOT NULL,
    `Fecha_ingreso` DATE NULL,
    `Estado_ninio` BOOLEAN NULL,
    `Fecha_baja` DATE NULL,

    PRIMARY KEY (`Infantes_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredientes` (
    `Ingrediente_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Ingrediente` VARCHAR(20) NULL,

    UNIQUE INDEX `Ingrediente`(`Ingrediente`),
    PRIMARY KEY (`Ingrediente_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus_dias` (
    `Menu_id` INTEGER NULL,
    `Dias` INTEGER NULL,

    INDEX `Menu_id`(`Menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menus_numeros` (
    `Menu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Num_menu` INTEGER NULL,

    UNIQUE INDEX `Num_menu`(`Num_menu`),
    PRIMARY KEY (`Menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parentesco` (
    `tipoParentesco` INTEGER NOT NULL AUTO_INCREMENT,
    `parentesco` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`tipoParentesco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patrocinador` (
    `Pagante_id` INTEGER NOT NULL,
    `Infantes_id` INTEGER NOT NULL,
    `Cuenta` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `Infantes_id`(`Infantes_id`),
    UNIQUE INDEX `Pagante_Infante_Unique`(`Pagante_id`, `Infantes_id`),
    PRIMARY KEY (`Pagante_id`, `Infantes_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platos` (
    `Plato_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_plato` VARCHAR(40) NOT NULL,

    UNIQUE INDEX `Nombre_plato`(`Nombre_plato`),
    PRIMARY KEY (`Plato_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platos_consumidos` (
    `Dia` INTEGER NOT NULL,
    `Infante_id` INTEGER NOT NULL,
    `Menu_id` INTEGER NOT NULL,

    INDEX `Infante_id`(`Infante_id`),
    INDEX `Menu_id`(`Menu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platos_ingredientes` (
    `Plato_id` INTEGER NULL,
    `Ingrediente_id` INTEGER NULL,

    INDEX `platos_ingredientes_ibfk_2`(`Ingrediente_id`),
    UNIQUE INDEX `Plato_id`(`Plato_id`, `Ingrediente_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relacionparentesco` (
    `Infante_id` INTEGER NOT NULL,
    `Representante_id` INTEGER NOT NULL,
    `tipoParentesco` INTEGER NULL,

    INDEX `Representante_id`(`Representante_id`),
    INDEX `tipoParentesco`(`tipoParentesco`),
    UNIQUE INDEX `no_repeticion_parentesco`(`Infante_id`, `tipoParentesco`),
    PRIMARY KEY (`Infante_id`, `Representante_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `representantes` (
    `Representante_id` INTEGER NOT NULL AUTO_INCREMENT,
    `Cedula` VARCHAR(15) NOT NULL,
    `Nombre` VARCHAR(50) NULL,
    `A_Paterno` VARCHAR(50) NULL,
    `A_Materno` VARCHAR(50) NULL,
    `Calle` VARCHAR(50) NULL,
    `Numero` TINYINT NULL,
    `DireccionId` INTEGER NULL,
    `Telefono_id` VARCHAR(15) NULL,

    INDEX `DireccionId`(`DireccionId`),
    PRIMARY KEY (`Representante_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `set_menus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Menu_id` INTEGER NULL,
    `Plato_id` INTEGER NULL,

    INDEX `set_set_menus_ibfk_2`(`Plato_id`),
    UNIQUE INDEX `Menu_id`(`Menu_id`, `Plato_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `alergias` ADD CONSTRAINT `alergias_ibfk_1` FOREIGN KEY (`Infante_id`) REFERENCES `infantes`(`Infantes_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `alergias` ADD CONSTRAINT `alergias_ibfk_2` FOREIGN KEY (`Ingrediente_id`) REFERENCES `ingredientes`(`Ingrediente_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `autorizaciones` ADD CONSTRAINT `autorizaciones_ibfk_3` FOREIGN KEY (`Infante_id`) REFERENCES `infantes`(`Infantes_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `autorizaciones` ADD CONSTRAINT `autorizaciones_ibfk_4` FOREIGN KEY (`Representante_id`) REFERENCES `representantes`(`Representante_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `menus_dias` ADD CONSTRAINT `menus_dias_ibfk_1` FOREIGN KEY (`Menu_id`) REFERENCES `menus_numeros`(`Menu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patrocinador` ADD CONSTRAINT `patrocinador_ibfk_1` FOREIGN KEY (`Infantes_id`) REFERENCES `infantes`(`Infantes_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patrocinador` ADD CONSTRAINT `patrocinador_ibfk_2` FOREIGN KEY (`Pagante_id`) REFERENCES `representantes`(`Representante_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `platos_consumidos` ADD CONSTRAINT `platos_consumidos_ibfk_1` FOREIGN KEY (`Infante_id`) REFERENCES `infantes`(`Infantes_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `platos_consumidos` ADD CONSTRAINT `platos_consumidos_ibfk_2` FOREIGN KEY (`Menu_id`) REFERENCES `menus_numeros`(`Menu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `platos_ingredientes` ADD CONSTRAINT `platos_ingredientes_ibfk_1` FOREIGN KEY (`Plato_id`) REFERENCES `platos`(`Plato_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `platos_ingredientes` ADD CONSTRAINT `platos_ingredientes_ibfk_2` FOREIGN KEY (`Ingrediente_id`) REFERENCES `ingredientes`(`Ingrediente_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `relacionparentesco` ADD CONSTRAINT `relacionparentesco_ibfk_1` FOREIGN KEY (`Infante_id`) REFERENCES `infantes`(`Infantes_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `relacionparentesco` ADD CONSTRAINT `relacionparentesco_ibfk_2` FOREIGN KEY (`Representante_id`) REFERENCES `representantes`(`Representante_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `relacionparentesco` ADD CONSTRAINT `relacionparentesco_ibfk_3` FOREIGN KEY (`tipoParentesco`) REFERENCES `parentesco`(`tipoParentesco`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `representantes` ADD CONSTRAINT `representantes_ibfk_1` FOREIGN KEY (`DireccionId`) REFERENCES `direcciones`(`Direccion_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `set_menus` ADD CONSTRAINT `set_menus_ibfk_1` FOREIGN KEY (`Menu_id`) REFERENCES `menus_numeros`(`Menu_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `set_menus` ADD CONSTRAINT `set_set_menus_ibfk_2` FOREIGN KEY (`Plato_id`) REFERENCES `platos`(`Plato_id`) ON DELETE CASCADE ON UPDATE NO ACTION;
