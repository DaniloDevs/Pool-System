import prisma from "@/connections/prisma"


export async function POST(request: Request,) {
     const { code, candidate } = await request.json()

     const vote = await prisma.voting.findUnique({ where: { code } })
     if (vote) return Response.json({ Messge: "Você ja fez uma votação" })

     await prisma.voting.create({
          data: {
               code,
               candidate
          }
     })
     console.log("Votação feita com sucesso")
}
