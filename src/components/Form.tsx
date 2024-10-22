// * biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */
'use client';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

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

    // Resetar o formulário após o envio
    reset();
    setSelectedOption(null);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option); // Atualiza a opção selecionada
  };

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6 bg-background rounded-lg border shadow-xl ">
      <div className="space-y-2">
        <Label htmlFor="code">Código:</Label>
        <Input
          className="bg-transparent border  rounded-md"
          id="code"
          {...register('code', { required: true })}
        />
      </div>

      <div className="space-y-2">
        <Label className="block mb-2">Select an Option</Label>
        <div className="grid grid-cols-2 gap-4">
          {options.map((option) => (
            <Card
              key={option}
              className={`cursor-pointer transition-all ${selectedOption === option ? 'ring-2 ring-primary' : ''
                }`}
              onClick={() => handleSelectOption(option)}
            >
              <CardContent className="flex items-center justify-between p-4">
                <span>{option}</span>
                {selectedOption === option && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </CardContent>
            </Card>
          ))}
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
