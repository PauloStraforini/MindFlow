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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, FileText, Users, TrendingUp, BrainCircuit, CheckCircle2, AlertCircle } from "lucide-react"
import { handleSingOut } from "@/components/actions/handle-singOut"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { use } from "react"

export default async function Page() {
  const session = await auth()

  if (!session) {
    redirect("/psicologos/login")
  }

  // Sample data for the dashboard
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

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-pink-100 dark:border-pink-800 px-4 bg-white dark:bg-pink-950/50">
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
        <div className="flex flex-1 flex-col gap-4 p-4 bg-gradient-to-b from-slate-50 to-pink-50 dark:from-pink-950 dark:to-pink-900 min-h-screen">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <Card className="w-full md:w-2/3 bg-white dark:bg-pink-900/50 border-pink-100 dark:border-pink-800">
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
                    <div
                      key={index}
                      className="flex flex-col p-4 rounded-lg border border-pink-100 dark:border-pink-800 bg-white dark:bg-pink-950/50"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-md ${stat.bgColor}`}>
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-pink-900 dark:text-pink-100">{stat.value}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="w-full md:w-1/3 bg-gradient-to-br from-blue-600 to-pink-800 text-white border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5" />
                  Assistente IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-pink-100 text-sm">
                    Baseado nos seus pacientes recentes, aqui estão algumas sugestões:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-pink-500/20 p-1 mt-0.5">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>3 pacientes precisam de atualização de prontuário</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-pink-500/20 p-1 mt-0.5">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>Novo artigo sobre Terapia Cognitivo-Comportamental disponível</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-pink-500/20 p-1 mt-0.5">
                        <CheckCircle2 className="h-3 w-3" />
                      </div>
                      <span>Lembrete: Conferência online amanhã às 19h</span>
                    </li>
                  </ul>
                  <button className="w-full mt-2 bg-white/10 hover:bg-white/20 text-white rounded-md py-1.5 text-sm font-medium transition-colors">
                    Ver todas as sugestões
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Logout Section */}
          {session?.user?.email && (
            <form action={handleSingOut} className="mt-4">
              <button
                className="border-black border rounded-md px-3 py-2 cursor-pointer bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                type="submit"
              >
                Sair do sistema
              </button>
            </form>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
