import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const r = await db.content.findMany({where:{type:"COURSE"}, select:{slug:true,title:true,_count:{select:{chapters:true}}}});
  console.log(JSON.stringify(r,null,2));
}
main().finally(() => db.$disconnect());
