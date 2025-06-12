
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const PreTestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: "",
    cpf: "",
    cidade: "",
    estado: "",
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

  const questions = [
    {
      id: "pergunta01",
      title: "01) No seu entendimento, como é classificado a cultura brasileira de confronto de negociação segundo o estudo HAVARD BUSINESS REVEW?",
      options: [
        "Evita confronto e não expressa emoção.",
        "Gosta de confrontar e não expressa emoção.",
        "Expressa emoção e evita confronto.",
        "Gosta de confrontar mas expressa emoção."
      ]
    },
    {
      id: "pergunta02",
      title: "02) Identifique três paradigmas (modelos mentais) de irresponsabilidade, influenciado pela cultura dos líderes na ocorrência de um acidente de trabalho nas empresas brasileiras.",
      options: [
        "A culpa é do acidentado - Nunca pedi para ele fazer isso - Os acidentes acontecem é muito risco.",
        "Isso foi uma aberração - Não temos leis fortes de Segurança - Ele era um bom empregado.",
        "A família vai sofrer - A segurança é custo - Vamos cuidar dele.",
        "Vai implicar ação judicial - A empresa exige um padrão seguro - Aonde eu errei."
      ]
    },
    {
      id: "pergunta03",
      title: "03) Assinale a simples característica de LIDERANÇA, para prevenção da vida?",
      options: [
        "É gestão que é priorização.",
        "Clarear as expectativas.",
        "Confrontar a realidade e assumindo a responsabilidade.",
        "Todas estão certas."
      ]
    },
    {
      id: "pergunta04",
      title: "04) O que fez a Fórmula 1 reduzir drasticamente as fatalidades dos pilotos depois da Morte de Ayrton Senna?",
      options: [
        "Aprimoramento na gestão de risco.",
        "Melhorias de segurança nos carros e nas roupas dos pilotos.",
        "Correta decisão política.",
        "Investimento financeiro em pesquisa e desenvolvimento."
      ]
    },
    {
      id: "pergunta05",
      title: "05) Qual o primeiro passo a ser dado para mudança, dentro dos oito passos de mudança do professor de Harvard John Kotter?",
      options: [
        "Estruturar a coalisão junto a liderança.",
        "Estabelecer Senso de Urgência.",
        "Desenvolver a Visão, Estratégia e Valores.",
        "Propiciar vitórias de curto prazo."
      ]
    },
    {
      id: "pergunta06",
      title: "06) Segundo a pesquisa da GALLUP quantos porcento de pessoas estão engajadas no trabalho, trabalham com paixão e se sentem conectados com a sua empresa, trazem melhorias e inovação?",
      options: [
        "28%.",
        "58%",
        "78%.",
        "88%"
      ]
    },
    {
      id: "pergunta07",
      title: "07) Qual a fórmula extraordinária de resultados sustentáveis?",
      options: [
        "Resultado=(Processos+Pessoas).",
        "Resultado=(Processos+Estrategia).",
        "Resultado=(Processos+Gestão+Estrategia).",
        "Resultado=(Processos+Empresa)"
      ]
    },
    {
      id: "pergunta08",
      title: "08) Qual o pilar que serve como base de sustentação da Liderança, conforme os 12 Pilares da Liderança do Brigadeiro William Cohen?",
      options: [
        "Conheça o seu negócio.",
        "Confiança.",
        "Autenticidade.",
        "Integridade."
      ]
    },
    {
      id: "pergunta09",
      title: "09) Como se constrói a CONFIANÇA do líder junto a equipe?",
      options: [
        "Comunicação e Meta.",
        "Competência e Apoio.",
        "Diretrizes e Feedback.",
        "Conhecimento e Feedback."
      ]
    },
    {
      id: "pergunta10",
      title: "10) Defina Comportamento?",
      options: [
        "São escolhas dentro de um padrão social.",
        "São alinhamento de valores e atitudes.",
        "São ações e atitudes visíveis impulsionadas pelas crenças, hábitos e valores.",
        "É a motivação interna e externas que forma o caráter de um indivíduo."
      ]
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'nomeCompleto', 'cpf', 'cidade', 'estado',
      'pergunta01', 'pergunta02', 'pergunta03', 'pergunta04', 'pergunta05',
      'pergunta06', 'pergunta07', 'pergunta08', 'pergunta09', 'pergunta10'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData] || formData[field as keyof typeof formData] === "") {
        return false;
      }
    }

    // Validate CPF format (only numbers)
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(formData.cpf)) {
      toast({
        title: "CPF Inválido",
        description: "Digite somente números no formato 12345678910",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Formulário Incompleto",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Here we would integrate with Supabase
      console.log("Form data to submit:", formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Formulário Enviado com Sucesso!",
        description: "Seus dados foram salvos com sucesso."
      });

      // Reset form
      setFormData({
        nomeCompleto: "",
        cpf: "",
        cidade: "",
        estado: "",
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
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao Enviar",
        description: "Ocorreu um erro ao enviar o formulário. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-6">
          <img 
            src="https://fomrs-acad-lider.lovable.app/lovable-uploads/cd5b5d51-f39e-4ded-9d8a-686459ccc11b.png" 
            alt="Academia de Líderes Logo" 
            className="mx-auto h-20 md:h-24 mb-4" 
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Academia de Líderes Módulo l
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-400 mb-3">
          Cadastro de Alunos
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Preencha seus dados para iniciar sua jornada na Academia de Líderes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dados Pessoais */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">Dados do Aluno</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nomeCompleto" className="text-gray-300">Nome Completo *</Label>
              <Input
                id="nomeCompleto"
                value={formData.nomeCompleto}
                onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="cpf" className="text-gray-300">CPF (somente números) *</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value.replace(/\D/g, ''))}
                placeholder="Digite somente números no formato 12345678910"
                className="bg-slate-700 border-slate-600 text-white"
                maxLength={11}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cidade" className="text-gray-300">Qual cidade você está realizando o treinamento? *</Label>
                <Input
                  id="cidade"
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="estado" className="text-gray-300">Qual estado você está realizando o treinamento? *</Label>
                <Input
                  id="estado"
                  value={formData.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção de Avaliação */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-xl">Seção de Avaliação - Pré Teste</CardTitle>
            <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-4 mt-4">
              <p className="text-yellow-400 font-medium">
                Ao responder, considere que cada questão possui uma única alternativa correta.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {questions.map((question) => (
              <div key={question.id} className="space-y-4 p-4 bg-slate-700/30 rounded-lg">
                <h3 className="text-white font-medium text-sm md:text-base leading-relaxed">
                  {question.title} *
                </h3>
                
                <RadioGroup
                  value={formData[question.id as keyof typeof formData] as string}
                  onValueChange={(value) => handleInputChange(question.id, value)}
                  className="space-y-3"
                >
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-start space-x-3">
                      <RadioGroupItem
                        value={option}
                        id={`${question.id}-${optionIndex}`}
                        className="border-white text-white mt-1 flex-shrink-0"
                      />
                      <Label
                        htmlFor={`${question.id}-${optionIndex}`}
                        className="text-gray-300 text-sm leading-relaxed cursor-pointer flex-1"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar Formulário'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PreTestForm;
