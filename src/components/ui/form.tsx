'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import SelectableButton from '../input';

import Image from 'next/image';
import foto1 from '../../assets/1.svg';

const schema = z.object({
  codigo: z.string().min(1, { message: 'Código é obrigatório' }),
  selectedOption: z.number().min(1, { message: 'Selecione uma opção' }),
});

interface IFormInput {
  codigo: number;
  selectedOption: number;
}

export default function Form() {
  const [codigo, setCodigo] = useState('');

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    resetField,
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      selectedOption: 0,
    },
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    // axios.post('http://localhost:3000/api/voting', {
    //   code: data.codigo,
    //   candidate: data.selectedOption,
    // });

    resetField('codigo');
    resetField('selectedOption');
    // Force refresh the page
    router.refresh();
  };

  const codigoValue = watch('codigo');
  const stateButton = codigoValue === 0;

  return (
    <div className="w-80 p-5 bg-gray-50 shadow-2xl rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 flex h-full flex-col content-center justify-between items-center"
      >
        <div className="flex items-center flex-col gap-3">
          <label htmlFor="voter" className="text-xl text-black capitalize">
            Insira seu Código
          </label>

          <input
            id="voter"
            {...register('codigo')}
            type="number"
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value);
            }}
            className="block w-full rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:content-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
          {errors.codigo && (
            <span className="text-red-500">{errors.codigo.message}</span>
          )}
        </div>

        <Controller
          name="selectedOption"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex w-60 flex-wrap gap-4 h-24 justify-center  content-center">
              <button
                type="button"
                onClick={() => onChange(1)}
                className={`relative inline-flex h-9 w-24 text-center items-center px-4 py-2 text-sm font-semibold active:bg-blue-600 
                    ${
                      value === 1
                        ? 'text-white bg-blue-600 text-center hover:bg-blue-700 rounded-xl'
                        : 'text-gray-900  ring-gray-300  text-center hover:duration-200 duration-300 border-gray-500 rounded-lg hover:rounded-xl'
                    } 
                        ring-1 ring-inset transition-colors duration-300 focus:z-20 focus:outline-offset-0`}
                disabled={!codigo}
              >
                <Image src={foto1} alt="candidato" />
              </button>
              <SelectableButton
                name="Joelson"
                value={2}
                isSelected={value === 2}
                onChange={onChange}
                state={!stateButton}
              />
              <SelectableButton
                name="Lobo"
                value={3}
                isSelected={value === 3}
                onChange={onChange}
                state={!stateButton}
              />
              <SelectableButton
                name="Cartaxo"
                value={4}
                isSelected={value === 4}
                onChange={onChange}
                state={!stateButton}
              />
            </div>
          )}
        />
        {errors.selectedOption && (
          <span className="text-red-500">{errors.selectedOption.message}</span>
        )}

        <button
          type="submit"
          className="flex w-4/5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300 hover:rounded-2xl hover:duration-300"
        >
          Enviar voto
        </button>
      </form>
    </div>
  );
}
