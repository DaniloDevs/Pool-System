// * biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */
'use client';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  code: string;
  selectedOption: string; // Apenas uma opção será selecionada
};

export default function Form() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = { ...data, selectedOption };
   
    try {
      fetch(
        `http://localhost:3000/api/voter?code=${encodeURIComponent(
          formData.code
        )}`,
        {
          method: 'GET',
        }
      )
        .then((response) => response.json())
        .then((result) => {
          fetch('http://localhost:3000/api/voting', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: formData.code,
              candidate: formData.selectedOption,
              voterId: result.id,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log('Sucesso:', result);
            })
            .catch((error) => {
              console.error('Erro:', error);
            });
        })
        .catch((error) => {
          console.error('Erro:', error);
        });
    } catch (error) {
      throw new Error(
        '➡️ Por favor, tente novamente. Houve um erro no servidor'
      );
    }
    // console.log(`Data: ${formData}`);

    // Resetar o formulário após o envio
    reset();
    setSelectedOption(null);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option); // Atualiza a opção selecionada
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-200 w-96 m-auto self-center'>
      <div>
        <label htmlFor="code">Código:</label>
        <input
          className="bg-transparent border border-white rounded-md"
          id="code"
          {...register('code', { required: true })}
        />
      </div>

      <div>
        <span>Escolha o seu candidato:</span>

        <div className="grid grid-cols-2 gap-2 ">
          <button
            className={`border rounded-md w-full ${
              selectedOption === '1'
                ? 'border-green-400 bg-white/25'
                : 'border-white'
            }`}
            type="button"
            onClick={() => handleSelectOption('1')}
          >
            Opção 1
          </button>
          <button
            type="button"
            className={`border rounded-md w-full ${
              selectedOption === '2'
                ? 'border-green-400 bg-white/25'
                : 'border-white'
            }`}
            onClick={() => handleSelectOption('2')}
          >
            Opção 2
          </button>
          <button
            type="button"
            className={`border rounded-md w-full ${
              selectedOption === '3'
                ? 'border-green-400 bg-white/25'
                : 'border-white'
            }`}
            onClick={() => handleSelectOption('3')}
          >
            Opção 3
          </button>
          <button
            type="button"
            className={`border rounded-md w-full ${
              selectedOption === '4'
                ? 'border-green-400 bg-white/25'
                : 'border-white'
            }`}
            onClick={() => handleSelectOption('4')}
          >
            Opção 4
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full p-4 border mt-2 rounded-md border-white"
        disabled={!selectedOption}
      >
        Enviar
      </button>
    </form>
  );
}
