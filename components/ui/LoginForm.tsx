import { handleAuth } from "@/components/actions/handle-auth";
import { FcGoogle } from "react-icons/fc";
import { GrLinkedin  } from "react-icons/gr";

import { ArrowRight } from "lucide-react";

export default function Login() {
  return (
    <div className="flex min-h-screen">
      {/* Background com animação gradiente */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-rose-100 to-purple-100 animate-gradient-slow"></div>
      
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-4">
        {/* Card principal */}
        <div className="w-full max-w-md">
          <div className="mb-8">

          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-pink-500/10 p-8 md:p-10 transform transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20">
            <div className="text-center space-y-3 mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Bem-vindo ao MindFlow
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                Conecte-se com segurança ao{" "}
                <span className="font-semibold text-pink-500">MindFlow</span>{" "}
                e comece sua jornada
              </p>
            </div>

            <form action={() => handleAuth('Google')} className="space-y-6">
              <button
              type="button"
              onClick={() => handleAuth('Google')}
              className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 via-pink-500 to-purple-500 text-white font-medium py-3 px-6 rounded-2xl shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
              <span className="bg-white p-1.5 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                <FcGoogle size={22} />
              </span>
              Entrar com Google
              <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </form>

            <form action={()=> handleAuth ('linkedin')} className="space-y-6 mt-6">
              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 via-pink-500 to-purple-500 text-white font-medium py-3 px-6 rounded-2xl shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <span className="bg-black p-1.5 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                  <GrLinkedin  size={22} />
                </span>
                Entrar com LinkedIn
                <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="text-xs font-medium text-gray-500">Proteção garantida</span>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>
              
              <p className="text-xs text-center text-gray-500 leading-relaxed">
                Seu acesso é protegido com autenticação segura.{" "}
                <span className="hover:text-pink-500 cursor-pointer transition-colors duration-300">
                  Saiba mais
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
