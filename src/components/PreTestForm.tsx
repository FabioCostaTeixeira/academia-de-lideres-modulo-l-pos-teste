import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import SuccessDialog from "./SuccessDialog";

// Função para aplicar máscara visual no CPF
function formatCpfMask(cpf: string) {
  const numbers = cpf.replace(/\D/g, "").slice(0, 11);
  return numbers.replace(/^(\d{3})(\d)/, "$1.$2").replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3").replace(/\.(\d{3})(\d)/, ".$1-$2");
}
const questions = [{
  id: "pergunta01",
  title: "01) No seu entendimento, como é classificado a cultura brasileira de confronto de negociação segundo o estudo HAVARD BUSINESS REVEW?",
  options: ["Evita confronto e não expressa emoção.", "Gosta de confrontar e não expressa emoção.", "Expressa emoção e evita confronto.", "Gosta de confrontar mas expressa emoção."]
}, {
  id: "pergunta02",
  title: "02) Identifique três paradigmas (modelos mentais) de irresponsabilidade, influenciado pela cultura dos líderes na ocorrência de um acidente de trabalho nas empresas brasileiras.",
  options: ["A culpa é do acidentado - Nunca pedi para ele fazer isso - Os acidentes acontecem é muito risco.", "Isso foi uma aberração - Não temos leis fortes de Segurança - Ele era um bom empregado.", "A família vai sofrer - A segurança é custo - Vamos cuidar dele.", "Vai implicar ação judicial - A empresa exige um padrão seguro - Aonde eu errei."]
}, {
  id: "pergunta03",
  title: "03) Assinale a simples característica de LIDERANÇA, para prevenção da vida?",
  options: ["É gestão que é priorização.", "Clarear as expectativas.", "Confrontar a realidade e assumindo a responsabilidade.", "Todas estão certas."]
}, {
  id: "pergunta04",
  title: "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades dos pilotos depois da Morte de Ayrton Senna?",
  options: ["Aprimoramento na gestão de risco.", "Melhorias de segurança nos carros e nas roupas dos pilotos.", "Correta decisão política.", "Investimento financeiro em pesquisa e desenvolvimento."]
}, {
  id: "pergunta05",
  title: "05) Qual o primeiro passo a ser dado para mudança, dentro dos oito passos de mudança do professor de Harvard John Kotter?",
  options: ["Estruturar a coalisão junto a liderança.", "Estabelecer Senso de Urgência.", "Desenvolver a Visão, Estratégia e Valores.", "Propiciar vitórias de curto prazo."]
}, {
  id: "pergunta06",
  title: "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas estão engajadas no trabalho, trabalham com paixão e se sentem conectados com a sua empresa, trazem melhorias e inovação?",
  options: ["28%.", "58%", "78%.", "88%"]
}, {
  id: "pergunta07",
  title: "07) Qual a fórmula extraordinária de resultados sustentáveis?",
  options: ["Resultado=(Processos+Pessoas).", "Resultado=(Processos+Estrategia).", "Resultado=(Processos+Gestão+Estrategia).", "Resultado=(Processos+Empresa)"]
}, {
  id: "pergunta08",
  title: "08) Qual o pilar que serve como base de sustentação da Liderança, conforme os 12 Pilares da Liderança do Brigadeiro William Cohen?",
  options: ["Conheça o seu negócio.", "Confiança.", "Autenticidade.", "Integridade."]
}, {
  id: "pergunta09",
  title: "09) Como se constrói a CONFIANÇA do líder junto a equipe?",
  options: ["Comunicação e Meta.", "Competência e Apoio.", "Diretrizes e Feedback.", "Conhecimento e Feedback."]
}, {
  id: "pergunta10",
  title: "10) Defina Comportamento?",
  options: ["São escolhas dentro de um padrão social.", "São alinhamento de valores e atitudes.", "São ações e atitudes visíveis impulsionadas pelas crenças, hábitos e valores.", "É a motivação interna e externas que forma o caráter de um indivíduo."]
}];
const PreTestForm = () => {
  // Estado do formulário
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    pergunta01: "",
    pergunta02: "",
    pergunta03: "",
    pergunta04: "",
    pergunta05: "",
    pergunta06: "",
    pergunta07: "",
    pergunta08: "",
    pergunta09: "",
    pergunta10: ""
  });

  // Estado: pergunta atual, carregando, openDialog
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Manipulação dos campos
  const handleInputChange = (field: string, value: string) => {
    if (field === "cpf") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);
      setFormData(prev => ({
        ...prev,
        cpf: onlyNumbers
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Validação dos campos obrigatórios (para currentQuestion)
  const isQuestionAnswered = () => {
    if (currentQuestion === -1) {
      // Dados pessoais
      return !!formData.nomeCompleto && /^\d{11}$/.test(formData.cpf);
    }
    const key = questions[currentQuestion]?.id;
    return key ? !!formData[key] : true;
  };
  const validateCpf = () => {
    const cpfRegex = /^\d{11}$/;
    return cpfRegex.test(formData.cpf);
  };

  // Progresso
  const totalSteps = 1 + questions.length;
  const currentStep = currentQuestion === -1 ? 1 : currentQuestion + 2;

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCpf()) {
      // Exibe erro visual apenas se CPF for inválido
      return;
    }
    setIsSubmitting(true);
    try {
      // TODO: Chamar o Supabase para salvar respostas do pós-teste (dados já estão prontos)
      // import { supabase } from "@/integrations/supabase/client";
      // await supabase.from("pos_teste_respostas").insert([{ ...formData }]);

      await new Promise(res => setTimeout(res, 2000));
      setOpenDialog(true); // Exibe popup customizado de sucesso

      // Reseta formulário ao fechar dialog (não aqui, para não sumir as respostas do dialog)
    } catch (error) {
      // TODO: Exibir erro visual customizado (Dialog/Toast)
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navegação entre etapas
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(i => i + 1);
    }
  };
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(i => i - 1);
    }
  };

  // Estado para dados pessoais
  const onNextDados = () => {
    if (!!formData.nomeCompleto && validateCpf()) setCurrentQuestion(0);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
    // Resetar formulário e voltar ao início
    setFormData({
      nomeCompleto: "",
      cpf: "",
      pergunta01: "",
      pergunta02: "",
      pergunta03: "",
      pergunta04: "",
      pergunta05: "",
      pergunta06: "",
      pergunta07: "",
      pergunta08: "",
      pergunta09: "",
      pergunta10: ""
    });
    setCurrentQuestion(-1);
  };

  // Página inicial = -1: Dados pessoais
  // currentQuestion 0-9: perguntas
  const [showCpfError, setShowCpfError] = useState(false);

  // Validação/submit "em tempo real"
  const handleDadosBlur = () => {
    if (formData.cpf && !validateCpf()) {
      setShowCpfError(true);
    } else {
      setShowCpfError(false);
    }
  };

  // Animação de transição simplificada usando Tailwind
  return <div className="container mx-auto px-4 py-8 max-w-2xl animate-fade-in">
      <SuccessDialog open={openDialog} onClose={handleDialogClose} />
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-6">
          <img src="/lovable-uploads/9db4d923-ff04-4e82-9e41-ddfebe49f7fb.png" alt="Academia de Líderes Logo" className="mx-auto h-20 md:h-24 mb-4" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Academia de Líderes - Módulo I - Pós Teste
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-3">
          Pós Teste
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Preencha seus dados para responder o pós teste
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Indicador de progresso */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="bg-yellow-400 h-2 transition-all" style={{
            width: `${(currentQuestion === -1 ? 0 : currentQuestion + 1) / totalSteps * 100}%`
          }} />
          </div>
          <div className="text-sm text-gray-200 font-medium min-w-fit">
            {currentQuestion === -1 ? "Dados do Aluno" : `Pergunta ${currentQuestion + 1} de ${questions.length}`}
          </div>
        </div>
        {/* Dados Pessoais */}
        {currentQuestion === -1 && <Card className="bg-slate-800/50 border-slate-700 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white text-xl">Dados do Aluno</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="nomeCompleto" className="text-gray-300">
                  Nome Completo *
                </Label>
                <Input id="nomeCompleto" value={formData.nomeCompleto} onChange={e => handleInputChange("nomeCompleto", e.target.value)} className="bg-slate-700 border-slate-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="cpf" className="text-gray-300">
                  CPF *
                </Label>
                <Input id="cpf" inputMode="numeric" autoComplete="off" value={formatCpfMask(formData.cpf)} onChange={e => handleInputChange("cpf", e.target.value)} onBlur={handleDadosBlur} placeholder="123.456.789-10" className={`bg-slate-700 border-slate-600 text-white ${showCpfError ? "border-red-500 focus:border-red-500" : ""}`} maxLength={14} required />
                {showCpfError && <p className="text-red-400 text-xs mt-1">
                    Digite o CPF no formato correto. Exemplo: 123.456.789-10
                  </p>}
              </div>
              <div className="flex justify-end pt-4">
                <Button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg" onClick={onNextDados} disabled={!formData.nomeCompleto || !validateCpf() || isSubmitting}>
                  {isSubmitting ? <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </> : <>
                      Próxima <ChevronRight className="ml-2 h-5 w-5" />
                    </>}
                </Button>
              </div>
            </CardContent>
          </Card>}

        {/* Seção de Perguntas (uma por vez) */}
        {currentQuestion > -1 && currentQuestion < questions.length && <Card className="bg-slate-800/50 border-slate-700 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white text-xl">Pós Teste</CardTitle>
              <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 mt-4">
                <p className="text-yellow-400 font-medium">
                  Ao responder, considere que cada questão possui uma única alternativa correta.
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div key={questions[currentQuestion].id} className="space-y-4 p-4 bg-slate-700/30 rounded-lg">
                <h3 className="text-white font-medium text-base leading-relaxed">
                  {questions[currentQuestion].title} *
                </h3>
                <RadioGroup value={formData[questions[currentQuestion].id as keyof typeof formData] as string} onValueChange={value => handleInputChange(questions[currentQuestion].id, value)} className="space-y-3">
                  {questions[currentQuestion].options.map((option, optionIndex) => <div key={optionIndex} className="flex items-start space-x-3">
                        <RadioGroupItem value={option} id={`${questions[currentQuestion].id}-${optionIndex}`} className="border-white text-white mt-1 flex-shrink-0" />
                        <Label htmlFor={`${questions[currentQuestion].id}-${optionIndex}`} className="text-gray-300 text-sm leading-relaxed cursor-pointer flex-1">
                          {option}
                        </Label>
                      </div>)}
                </RadioGroup>
              </div>
              {/* Navegação entre Perguntas */}
              <div className="flex items-center justify-between pt-6">
                <Button type="button" variant="secondary" onClick={handlePrev} className="flex items-center" disabled={currentQuestion === 0 || isSubmitting}>
                  <ChevronLeft className="mr-1 h-5 w-5" />
                  Anterior
                </Button>
                <span className="text-gray-400 text-sm">{`Pergunta ${currentQuestion + 1} de ${questions.length}`}</span>
                {currentQuestion < questions.length - 1 ? <Button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg" onClick={handleNext} disabled={!formData[questions[currentQuestion].id as keyof typeof formData] || isSubmitting}>
                    Próxima <ChevronRight className="ml-2 h-5 w-5" />
                  </Button> : <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg min-w-[150px]" disabled={!formData[questions[currentQuestion].id as keyof typeof formData] || isSubmitting}>
                    {isSubmitting ? <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </> : "Enviar Formulário"}
                  </Button>}
              </div>
            </CardContent>
          </Card>}
      </form>
    </div>;
};
export default PreTestForm;