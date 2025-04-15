"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, ArrowRight, Lock, Mail, Eye, EyeOff, Brain } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Simulação de autenticação
      if (email === "admin@example.com" && password === "password") {
        router.push("/dashboard")
        router.refresh()
      } else {
        setError("Email ou senha inválidos")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Ocorreu um erro durante o login")
    } finally {
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
          <p className="text-gray-600">Acesse sua conta e transforme sua prática clínica</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:border-pink-200">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-pink-800 mb-6 text-center">Login</h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 text-sm">{error}</div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
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
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Senha
                  </Label>
                  <Link
                    href="/esqueci-senha"
                    className="text-sm text-pink-600 hover:text-pink-700 hover:underline transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
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
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox id="remember" className="border-pink-300 text-pink-600 focus:ring-pink-500" />
                <Label htmlFor="remember" className="ml-2 text-sm text-gray-600 font-normal">
                  Lembrar de mim
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
                    <span>Entrando...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center group">
                    <span>Entrar</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                Ainda não tem uma conta?{" "}
                <Link
                  href="/psicologos/criarconta"
                  className="text-pink-600 font-medium hover:text-pink-700 hover:underline transition-colors"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-pink-400 via-pink-300 to-purple-300 p-4 text-center">
            <p className="text-sm text-pink-800">Acesso seguro com criptografia de ponta a ponta</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-pink-100">
            <div className="text-sm text-pink-800">Dados Protegidos</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-pink-100">
            <div className="text-sm text-pink-800">Suporte 24/7</div>
          </div>
        </div>
      </div>
    </div>
  )
}
