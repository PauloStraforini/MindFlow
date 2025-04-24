
import React from 'react';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PatientList } from "@/components/ui/PatientList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const stats = [
  { label: "Total de Pacientes", value: "128", change: "+12% este mês" },
  { label: "Pacientes Ativos", value: "98", change: "+5% este mês" },
  { label: "Novos Pacientes", value: "14", change: "+8% este mês" },
  { label: "Consultas Pendentes", value: "23", change: "-3% este mês" },
];

export default function Patients() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-purple-100 px-4 sticky top-0 z-10 backdrop-blur-sm bg-white/80">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1 text-gray-600 hover:text-purple-600" />
              <Separator orientation="vertical" className="mr-2 h-4 bg-purple-200" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-xl font-semibold">Gestão de Pacientes</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </header>

          <main className="p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>

            <PatientList />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
