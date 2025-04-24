
import { BrainCircuit, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Suggestion {
  id: number;
  text: string;
}

interface AIAssistantProps {
  suggestions: Suggestion[];
}

export function AIAssistant({ suggestions }: AIAssistantProps) {
  return (
    <Card className="w-full md:w-1/3 bg-gradient-to-br from-blue-600 to-pink-800 text-white border-none hover:shadow-xl transition-shadow">
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
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="flex items-start gap-2 hover:bg-white/5 p-2 rounded-md transition-colors">
                <div className="rounded-full bg-pink-500/20 p-1 mt-0.5">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
                <span>{suggestion.text}</span>
              </li>
            ))}
          </ul>
          <button className="w-full mt-2 bg-white/10 hover:bg-white/20 text-white rounded-md py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/20">
            Ver todas as sugestões
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
