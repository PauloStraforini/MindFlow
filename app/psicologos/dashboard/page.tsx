
"use client"
import { Sidebar } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Calendar, CheckCircle2, Clock, FileText, Users } from "lucide-react"
import { handleSingOut } from "@/components/actions/handle-singOut"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

import { StatCard } from "@/components/ui/StatCard"
import { AIAssistant } from "@/components/ui/AIAssistant"


export default async function Page() {
  const session = await auth()
  if (!session) {
    redirect("/psicologos/login")
  }
  
  const stats = [
    {
      title: "Pacientes Ativos",
      value: "32",
      change: "+2 este mês",
      icon: Users,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-100 dark:bg-pink-900/50",
    },
    {
      title: "Sessões Agendadas",
      value: "12",
      change: "Próximos 7 dias",
      icon: Calendar,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-100 dark:bg-pink-900/50",
    },
    {
      title: "Relatórios Pendentes",
      value: "5",
      change: "3 com prazo próximo",
      icon: FileText,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-100 dark:bg-pink-900/50",
    },
    {
      title: "Horas Trabalhadas",
      value: "24h",
      change: "Esta semana",
      icon: Clock,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-100 dark:bg-pink-900/50",
    },
  ]

  const upcomingAppointments = [
    {
      patient: "Maria Silva",
      time: "Hoje, 14:00",
      type: "Terapia Individual",
      status: "confirmado",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      patient: "João Santos",
      time: "Hoje, 16:30",
      type: "Primeira Consulta",
      status: "confirmado",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      patient: "Ana Oliveira",
      time: "Amanhã, 09:00",
      type: "Terapia Individual",
      status: "pendente",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      patient: "Carlos Mendes",
      time: "Amanhã, 11:30",
      type: "Avaliação Psicológica",
      status: "confirmado",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      patient: "Juliana Costa",
      time: "Quinta, 15:00",
      type: "Terapia Individual",
      status: "confirmado",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const recentActivities = [
    {
      type: "Prontuário Atualizado",
      patient: "Maria Silva",
      time: "Há 2 horas",
      icon: FileText,
      color: "text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/50",
    },
    {
      type: "Sessão Concluída",
      patient: "Pedro Almeida",
      time: "Há 4 horas",
      icon: CheckCircle2,
      color: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/50",
    },
    {
      type: "Novo Agendamento",
      patient: "Fernanda Lima",
      time: "Há 1 dia",
      icon: Calendar,
      color: "text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/50",
    },
    {
      type: "Alerta de Paciente",
      patient: "Roberto Gomes",
      time: "Há 1 dia",
      icon: AlertCircle,
      color: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/50",
    },
  ]


  const aiSuggestions = [
    { id: 1, text: "Considere revisar os relatórios pendentes." },
    { id: 2, text: "Você tem uma sessão agendada em breve." },
    { id: 3, text: "Lembre-se de atualizar os prontuários após as sessões." },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-pink-100 dark:border-pink-800 px-4 bg-white dark:bg-pink-950/50 sticky top-0 z-10 backdrop-blur-sm bg-white/80 dark:bg-pink-950/80">
            <SidebarTrigger className="-ml-1 text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-pink-200 dark:bg-pink-700" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink
                    href="#"
                    className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-pink-300 dark:text-pink-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-800 dark:text-gray-200">Visão Geral</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>

          <main className="flex flex-1 flex-col gap-4 p-4 bg-gradient-to-b from-slate-50 to-pink-50 dark:from-pink-950 dark:to-pink-900 min-h-screen">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <Card className="w-full md:w-2/3 bg-white dark:bg-pink-900/50 border-pink-100 dark:border-pink-800 hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-bold text-pink-900 dark:text-pink-100">
                    Bem-vindo ao MindFlow, {session?.user?.name ? `Dr. ${session.user.name}` : "Usuário"}
                    </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Aqui está um resumo da sua agenda e atividades recentes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <StatCard key={index} {...stat} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <AIAssistant suggestions={aiSuggestions} />
            </div>

            {session?.user?.email && (
              <form action={handleSingOut} className="mt-4">
              <button
                className="px-4 py-2 rounded-md bg-pink-600 text-white hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-pink-900"
                type="submit"
              >
                Sair do sistema
              </button>
            </form>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}