const { PrismaClient } = require('@prisma/client');
const { turma } = require('../src/assets/turma');

const prisma = new PrismaClient();

async function seedLoad() {
  try {
    for (const aluno of turma) {
      await prisma.voter.create({
        data: {
          name: aluno.NOME,
          votecode: Number(aluno.CODIGO),
          validVote: true,
        },
      });
    }
  } catch (e) {
    console.error(e);
    return;
  } finally {
    await prisma.$disconnect();
  }
}
seedLoad();
