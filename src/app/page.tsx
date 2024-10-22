'use client';
import Form from '@/components/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function Home() {
  const [candidate, setCandidate] = useState<number>();

  const schema = z.object({
    codigo: z.string().min(1, { message: 'Código é obrigatório' }),
    selectedOption: z.number().min(1, { message: 'Selecione uma opção' }),
  });

  interface IFormInput {
    codigo: number;
    selectedOption: number;
  }

  return (
    <>
      <Form />
    </>
  );
}
