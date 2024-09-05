'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form"

import * as z from 'zod';

const schema = z.object({
  codigo: z.number().min(1, { message: 'Required' })
});

interface IFormInput {
  codigo: number
}

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  }

  return (
    <>
      <div className="flex w-full h-screen justify-center items-center bg-slate-200">
        <div className="w-1/4 h-4/6 p-5 bg-gray-50 shadow-2xl rounded-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex h-full flex-col justify-between items-center">
            <div className="flex items-center flex-col gap-3">
              <label className="text-xl text-black capitalize">
                Insira seu Código
              </label>

              <input
                {...register("codigo")}
                type="number"

                aria-invalid={errors.codigo ? "true" : "false"}
                className="block w-full rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:content-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
             

            </div>

            <div className="h-48">
              <h1>Vai ter coisa aqui</h1>
            </div>

            <input
              type="submit"
              value="Enviar"
              className="flex w-4/5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300 hover:rounded-2xl hover:duration-300"
            />
          </form>
        </div>
      </div>
    </>
  )
}
