-- CreateTable
CREATE TABLE "tlestring" (
    "noradcatid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "objectname" TEXT NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT NOT NULL,
    "latest_update_datetime" DATETIME
);
