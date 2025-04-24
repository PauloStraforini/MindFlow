
import React from 'react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreVertical } from "lucide-react";

interface Patient {
  name: string;
  email: string;
  phone: string;
  lastAppointment: string;
  nextAppointment: string;
  status: "Ativo" | "Inativo" | "Pendente";
}

const patients: Patient[] = [
  {
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 98765-4321",
    lastAppointment: "10/04/2025",
    nextAppointment: "17/04/2025",
    status: "Ativo"
  },
  {
    name: "João Santos",
    email: "joao.santos@email.com",
    phone: "(11) 97654-3210",
    lastAppointment: "08/04/2025",
    nextAppointment: "15/04/2025",
    status: "Ativo"
  },
  {
    name: "Ana Paula Oliveira",
    email: "ana.oliveira@email.com",
    phone: "(11) 96543-2109",
    lastAppointment: "05/04/2025",
    nextAppointment: "19/04/2025",
    status: "Ativo"
  },
  {
    name: "Rafael Ferreira",
    email: "rafael.ferreira@email.com",
    phone: "(11) 95432-1098",
    lastAppointment: "01/04/2025",
    nextAppointment: "-",
    status: "Inativo"
  },
  {
    name: "Luciana Costa",
    email: "luciana.costa@email.com",
    phone: "(11) 94321-0987",
    lastAppointment: "-",
    nextAppointment: "12/04/2025",
    status: "Pendente"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ativo":
      return "bg-emerald-100 text-emerald-700";
    case "Inativo":
      return "bg-red-100 text-red-700";
    case "Pendente":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export function PatientList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Buscar pacientes..."
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="name">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nome</SelectItem>
              <SelectItem value="lastAppointment">Última Consulta</SelectItem>
              <SelectItem value="nextAppointment">Próxima Consulta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Última Consulta</TableHead>
            <TableHead>Próxima Consulta</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.email}>
              <TableCell className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    {getInitials(patient.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm text-gray-500">{patient.email}</div>
                </div>
              </TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.lastAppointment}</TableCell>
              <TableCell>{patient.nextAppointment}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          disabled
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-purple-100 text-purple-700"
        >
          1
        </Button>
        <Button
          variant="outline"
          size="sm"
        >
          2
        </Button>
        <Button
          variant="outline"
          size="sm"
        >
          3
        </Button>
        <Button
          variant="outline"
          size="sm"
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
