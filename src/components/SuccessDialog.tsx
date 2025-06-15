
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 border-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="flex flex-col items-center py-8 px-4">
          <img
            src="/lovable-uploads/9db4d923-ff04-4e82-9e41-ddfebe49f7fb.png"
            alt="Academia de Líderes Logo"
            className="mb-4 mx-auto h-20 md:h-24"
          />
          <h2 className="text-2xl font-bold text-white mb-2 text-center">
            Formulário Enviado!
          </h2>
          <p className="text-slate-300 text-center mb-6">
            Suas respostas ao Pós Teste foram recebidas com sucesso.<br/>
            Obrigado por participar!
          </p>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 text-lg"
            onClick={onClose}
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
