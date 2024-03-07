-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL NOT NULL,
    "userIP" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postal" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "joinUTCDate" TIMESTAMP(3) NOT NULL,
    "userVisits" TIMESTAMP(3)[],
    "countryCode" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Navbar" (
    "id" SERIAL NOT NULL,
    "userIP" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "isSideNavbar" BOOLEAN NOT NULL,
    "desc" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Navbar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footer" (
    "id" SERIAL NOT NULL,
    "userIP" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Home" (
    "id" SERIAL NOT NULL,
    "userIP" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "userIP" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "userIP" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "tittle" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "userIP" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "tittle" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNavigation" (
    "id" SERIAL NOT NULL,
    "userIP" TEXT NOT NULL,
    "navigation" JSONB NOT NULL,
    "userEntry" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNavigation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Options" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "boolValue" BOOLEAN,
    "value" TEXT,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userIP_key" ON "Users"("userIP");

-- CreateIndex
CREATE UNIQUE INDEX "Options_name_key" ON "Options"("name");

-- AddForeignKey
ALTER TABLE "Navbar" ADD CONSTRAINT "Navbar_userIP_fkey" FOREIGN KEY ("userIP") REFERENCES "Users"("userIP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Footer" ADD CONSTRAINT "Footer_userIP_fkey" FOREIGN KEY ("userIP") REFERENCES "Users"("userIP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Home" ADD CONSTRAINT "Home_userIP_fkey" FOREIGN KEY ("userIP") REFERENCES "Users"("userIP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "About" ADD CONSTRAINT "About_userIP_fkey" FOREIGN KEY ("userIP") REFERENCES "Users"("userIP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userIP_fkey" FOREIGN KEY ("userIP") REFERENCES "Users"("userIP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_userIP_fkey" FOREIGN KEY ("userIP") REFERENCES "Users"("userIP") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNavigation" ADD CONSTRAINT "UserNavigation_userIP_fkey" FOREIGN KEY ("userIP") REFERENCES "Users"("userIP") ON DELETE CASCADE ON UPDATE CASCADE;
