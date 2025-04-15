"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, ArrowRight, User, Mail, Lock, Eye, EyeOff, Brain, CheckCircle2, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    setPasswordStrength(strength)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "password") {
      checkPasswordStrength(value)
      if (formData.confirmPassword) {
        setPasswordMatch(value === formData.confirmPassword)
      }
    }

    if (name === "confirmPassword") {
      setPasswordMatch(formData.password === value)
    }
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return
    }

    if (passwordStrength < 3) {
      setError("Sua senha não é forte o suficiente")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call for registration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to dashboard or verification page
      router.push("/dashboard")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Ocorreu um erro durante o cadastro")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-3 rounded-full shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-rose-500 to-purple-800 bg-clip-text text-transparent">MindFlow</span>
          </h1>
          <p className="text-gray-600">Crie sua conta e transforme sua prática clínica</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:border-pink-200">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-pink-800 mb-6 text-center">Cadastro</h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Nome completo
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Seu nome completo"
                    required
                    className="pl-10 bg-pink-50/50 border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-lg"
                    disabled={isLoading}
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    className="pl-10 bg-pink-50/50 border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-lg"
                    disabled={isLoading}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="pl-10 pr-10 bg-pink-50/50 border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-lg"
                    disabled={isLoading}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < passwordStrength
                              ? passwordStrength === 1
                                ? "bg-red-400"
                                : passwordStrength === 2
                                  ? "bg-yellow-400"
                                  : passwordStrength === 3
                                    ? "bg-green-400"
                                    : "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Sua senha deve ter pelo menos 8 caracteres, incluir letras maiúsculas, números e símbolos
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirmar senha
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className={`pl-10 pr-10 bg-pink-50/50 border-pink-100 focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 rounded-lg ${
                      formData.confirmPassword && !passwordMatch
                        ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                        : ""
                    }`}
                    disabled={isLoading}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.confirmPassword && !passwordMatch && (
                  <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
                )}
              </div>

              <div className="flex items-start">
                <Checkbox id="terms" required className="border-pink-300 text-pink-600 focus:ring-pink-500 mt-1" />
                <Label htmlFor="terms" className="ml-2 text-sm text-gray-600 font-normal">
                  Eu concordo com os{" "}
                  <Link href="/termos" className="text-pink-600 hover:text-pink-700 hover:underline">
                    Termos de Serviço
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacidade" className="text-pink-600 hover:text-pink-700 hover:underline">
                    Política de Privacidade
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-rose-500 to-purple-800 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-pink-200 transform hover:-translate-y-1 h-12"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Processando...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center group">
                    <span>Criar conta</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Já tem uma conta?{" "}
                <Link
                  href="/psicologos/login"
                  className="text-pink-600 font-medium hover:text-pink-700 hover:underline transition-colors"
                >
                  Faça login
                </Link>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-400 via-pink-300 to-purple-300 p-4">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center text-pink-800 text-sm">
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                <span>Dados protegidos</span>
              </div>
              <div className="flex items-center text-pink-800 text-sm">
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                <span>Suporte 24/7</span>
              </div>
              <div className="flex items-center text-pink-800 text-sm">
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                <span>Teste grátis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">Ao se cadastrar, você terá acesso a 7 dias de teste gratuito</p>
        </div>
      </div>
    </div>
  )
}
