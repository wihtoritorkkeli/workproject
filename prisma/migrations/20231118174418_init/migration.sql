-- CreateTable
CREATE TABLE "Kayttaja" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kayttajatunnus" TEXT NOT NULL,
    "salasana" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Liidit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kayttajatunnus" TEXT NOT NULL,
    "liidi" TEXT NOT NULL
);
