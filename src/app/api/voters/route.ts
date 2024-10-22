import prisma from "@/connections/prisma";


export async function GET() {
  const voters = await prisma.voter.findMany();


  return Response.json(voters)
}
