'use client'


import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import SelectableButton from "../input";


import * as z from 'zod';

const schema = z.object({
	codigo: z.string().min(1, { message: 'Código é obrigatório' }),
	selectedOption: z.string().min(1, { message: 'Selecione uma opção' })
});


interface IFormInput {
	codigo: string
	selectedOption: string;
}

export default function Form() {
	const [Codigo, setCodigo] = useState('')
	const { register, control, handleSubmit, watch, formState: { errors },reset } = useForm<IFormInput>({
		resolver: zodResolver(schema),
		defaultValues: {
			selectedOption: '',
		},
	});

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		console.log(data)
		reset()
	}

	const codigoValue = watch('codigo');
	const stateButton = codigoValue !== ''

	return (
		<div className="w-80 p-5 bg-gray-50 shadow-2xl rounded-2xl">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex h-full flex-col content-center justify-between items-center">

				<div className="flex items-center flex-col gap-3">
					<label className="text-xl text-black capitalize">
						Insira seu Código
					</label>

					<input
						{...register("codigo")}
						type="number"
						value={Codigo}
						onChange={(e) => { setCodigo(e.target.value) }}
						className="block w-full rounded-md px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:content-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
					/>
					{errors.codigo && <span className="text-red-500">{errors.codigo.message}</span>}
				</div>

				<Controller
					name="selectedOption"
					control={control}

					render={({ field: { onChange, value } }) => (
						<div className="flex w-60 flex-wrap gap-4 h-24 justify-center  content-center">
							<SelectableButton
								value="Tábata"
								isSelected={value === 'Tábata'}
								onChange={onChange}
								state={stateButton}
							/>
							<SelectableButton
								value="Joelson"
								isSelected={value === 'Joelson'}
								onChange={onChange}
								state={stateButton}
							/>
							<SelectableButton
								value="Lobo"
								isSelected={value === 'Lobo'}
								onChange={onChange}
								state={stateButton}
							/>
							<SelectableButton
								value="Cartaxo"
								isSelected={value === 'Cartaxo'}
								onChange={onChange}
								state={stateButton}
							/>
						</div>
					)}
				/>
				{errors.selectedOption && <span className="text-red-500">{errors.selectedOption.message}</span>}

				<button
					type="submit"

					className="flex w-4/5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-300 hover:rounded-2xl hover:duration-300"
				>
					Enviar voto
				</button>
			</form>
		</div>
	)
}