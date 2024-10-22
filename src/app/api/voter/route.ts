import prisma from '@/connections/prisma';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  const vote = await prisma.voter.findUnique({
    where: { votecode: Number(code), validVote: true },
  });

  if (!vote) {
    throw new Error('Você já votou!');
  }

  return Response.json(vote);
}
