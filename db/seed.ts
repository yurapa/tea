import { PrismaClient } from "@prisma/client";

import { hash } from "@/lib/encrypt";
import sampleDataUsers from "@/db/sample-data-users";
import sampleDataProducts from "@/db/sample-data-products";

async function main() {
  const prisma = new PrismaClient();

  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleDataProducts });

  const users = [];
  for (let i = 0; i < sampleDataUsers.length; i++) {
    users.push({
      ...sampleDataUsers[i],
      password: await hash(sampleDataUsers[i].password),
    });
    console.log(
      sampleDataUsers[i].password,
      await hash(sampleDataUsers[i].password),
    );
  }
  await prisma.user.createMany({ data: users });

  console.log("Database seeded successfully");
}

main();
