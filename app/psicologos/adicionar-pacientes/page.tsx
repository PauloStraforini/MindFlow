'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const schema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  cpf: z.string().min(14, 'CPF inválido'),
  nascimento: z
    .string()
    .refine(
      (value) => !isNaN(new Date(value).getTime()) && new Date(value) <= new Date(),
      'Data de nascimento inválida ou no futuro'
    ),
  email: z.string().email('Email inválido'),
  telefone: z
    .string()
    .regex(
      /^\d{11}$/,
      'Telefone inválido. Exemplo: 15988337416'
    ),
  endereco: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function CadastroPaciente() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  // Função de envio dos dados para a API
  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const paciente = await response.json()
        console.log('Paciente cadastrado com sucesso:', paciente)
        // Aqui você pode adicionar lógica para redirecionar ou mostrar um sucesso para o usuário
      } else {
        const errorData = await response.json()
        console.error('Erro ao cadastrar paciente:', errorData.error)
        // Aqui você pode adicionar lógica para mostrar uma mensagem de erro ao usuário
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error)
      // Aqui você pode adicionar lógica para mostrar uma mensagem de erro ao usuário
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl mx-auto bg-white dark:bg-pink-900/30 p-6 rounded-xl border border-pink-200 dark:border-pink-700 space-y-6"
    >
      <header>
        <h1 className="text-2xl font-bold text-pink-800 dark:text-pink-100">Cadastro de Novo Paciente</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">Preencha os dados abaixo para registrar um novo paciente.</p>
      </header>

      {/* Seção 1: Dados Pessoais */}
      <section>
        <h2 className="font-semibold text-pink-700 dark:text-pink-200">Dados Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Nome Completo *</label>
            <input
              type="text"
              placeholder="Digite o nome completo"
              {...register('nome')}
              className="input input-bordered w-full"
            />
            <span className="text-sm text-red-500">{errors.nome?.message}</span>
          </div>

          <div>
            <label className="label">CPF *</label>
            <input
              type="text"
              {...register('cpf')}
              className="input input-bordered w-full"
              placeholder="000.000.000-00"
            />
            <span className="text-sm text-red-500">{errors.cpf?.message}</span>
          </div>

          <div>
            <label className="label">Data de Nascimento *</label>
            <input
              type="date"
              {...register('nascimento')}
              className="input input-bordered w-full"
            />
            <span className="text-sm text-red-500">{errors.nascimento?.message}</span>
          </div>
        </div>
      </section>

      {/* Seção 2: Contato */}
      <section>
        <h2 className="font-semibold text-pink-700 dark:text-pink-200">Contato</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Email *</label>
            <input
              type="email"
              placeholder="exemplo@dominio.com"
              {...register('email')}
              className="input input-bordered w-full"
            />
            <span className="text-sm text-red-500">{errors.email?.message}</span>
          </div>
          <div>
            <label className="label">Telefone *</label>
            <input
              type="text"
              {...register('telefone')}
              className="input input-bordered w-full"
              placeholder="Numero de telefone"
            />
            <span className="text-sm text-red-500">{errors.telefone?.message}</span>
          </div>
        </div>
      </section>

      {/* Seção 3: Endereço */}
      <section>
        <h2 className="font-semibold text-pink-700 dark:text-pink-200">Endereço</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">Endereço</label>
            <input
              type="text"
              {...register('endereco')}
              className="input input-bordered w-full"
              placeholder="Rua, Avenida, Praça..."
            />
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <div className="text-sm text-gray-500 dark:text-gray-300">
        * Campos obrigatórios
      </div>
      <div className="flex gap-4 mt-4">
        <button type="submit" className="btn btn-primary cursor-pointer">
          Salvar Cadastro
        </button>
        <button type="button" className="btn btn-outline">Cancelar</button>
      </div>
    </form>
  )
}
