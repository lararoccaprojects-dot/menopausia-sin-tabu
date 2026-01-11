import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checkoutUrl: string;
  source?: "home" | "demo";
}

export function CheckoutModal({ open, onOpenChange, checkoutUrl, source = "home" }: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const captureLeadMutation = trpc.checkout.captureLead.useMutation({
    onSuccess: () => {
      const url = new URL(checkoutUrl);
      url.searchParams.set("name", name);
      url.searchParams.set("email", email);
      window.location.href = url.toString();
    },
    onError: (error) => {
      console.error("Error al capturar lead:", error);
      alert("Hubo un error. Por favor intenta de nuevo.");
    },
  });

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre y apellido";
    } else if (name.trim().split(/\s+/).length < 2) {
      newErrors.name = "Por favor ingresa tu nombre y apellido";
    }
    
    if (!email.trim()) {
      newErrors.email = "Por favor ingresa tu email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Por favor ingresa un email válido";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    captureLeadMutation.mutate({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      source,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Un paso más para tu bienestar
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Déjanos tus datos para continuar al checkout seguro y recibir tu acceso inmediato.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nombre y Apellido
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Ej: María González"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={errors.name ? "border-red-500" : ""}
              disabled={captureLeadMutation.isPending}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={errors.email ? "border-red-500" : ""}
              disabled={captureLeadMutation.isPending}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white"
            disabled={captureLeadMutation.isPending}
          >
            {captureLeadMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Procesando...
              </>
            ) : (
              "Continuar al Checkout"
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Tus datos están seguros. No compartimos tu información.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
