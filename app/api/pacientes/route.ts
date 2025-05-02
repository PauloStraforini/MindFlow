// pages/api/pacientes/index.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function GET() {
  try {
    const pacientes = await prisma.paciente.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(pacientes)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Erro ao buscar pacientes', detalhe: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, cpf, nascimento, email, telefone, endereco } = body

    if (!nome || !cpf || !nascimento || !email || !telefone) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    const paciente = await prisma.paciente.create({
      data: {
        nome,
        cpf,
        nascimento: new Date(nascimento),
        email,
        telefone,
        endereco,
      },
    })

    return NextResponse.json(paciente, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'CPF ou Email já cadastrado' }, { status: 409 })
    }

    return NextResponse.json({ error: 'Erro ao cadastrar paciente', detalhe: error.message }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.paciente.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Paciente removido com sucesso' })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Erro ao deletar paciente', detalhe: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { nome, cpf, nascimento, email, telefone, endereco } = body

    const paciente = await prisma.paciente.update({
      where: { id: params.id },
      data: {
        nome,
        cpf,
        nascimento: new Date(nascimento),
        email,
        telefone,
        endereco,
      },
    })

    return NextResponse.json(paciente)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Erro ao atualizar paciente', detalhe: error.message },
      { status: 500 }
    )
  }
}