import prisma from '@/connections/prisma';

export async function POST(request: Request) {
  const { code, candidate, voterId } = await request.json();

  const vote = await prisma.voting.findUnique({ where: { code } });
  if (vote) return Response.json({ Messge: 'Você ja fez uma votação' });

  const [newVote, _] = await prisma.$transaction([
    prisma.voting.create({
      data: {
        code,
        candidate,
        voterId,
      },
    }),
    prisma.voter.update({
      where: {
        id: voterId,
      },
      data: { validVote: false },
    }),
  ]);
  console.log('Votação feita com sucesso');

  return Response.json(newVote);
}
