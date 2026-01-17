import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ComponentProps } from "react";
import { trpc } from "@/lib/trpc";

interface HotmartCheckoutButtonProps extends ComponentProps<typeof Button> {
  page: "upsell" | "downsell" | "main";
  email?: string;
  name?: string;
  label?: string;
  showLoader?: boolean;
}

/**
 * Componente reutilizable para botón de checkout con Hotmart
 * Genera dinámicamente la URL de checkout y redirige al usuario
 */
export function HotmartCheckoutButton({
  page,
  email,
  name,
  label = "Comprar Ahora",
  showLoader = true,
  ...buttonProps
}: HotmartCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const getCheckoutLink = trpc.hotmart.getCheckoutLink.useQuery(
    { page, email, name },
    { enabled: false }
  );

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await getCheckoutLink.refetch();
      if (result.data?.checkoutUrl) {
        // Redirigir a Hotmart
        window.location.href = result.data.checkoutUrl;
      } else {
        console.error("Failed to get checkout URL");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error getting checkout URL:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      {...buttonProps}
      onClick={handleClick}
      disabled={isLoading || buttonProps.disabled}
    >
      {isLoading && showLoader && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {isLoading ? "Redirigiendo..." : label}
    </Button>
  );
}

/**
 * Hook para obtener la URL de checkout de Hotmart
 */
export function useHotmartCheckoutUrl(
  page: "upsell" | "downsell" | "main",
  email?: string,
  name?: string
) {
  const { data, isLoading, error } = trpc.hotmart.getCheckoutLink.useQuery({
    page,
    email,
    name,
  });

  return {
    checkoutUrl: data?.checkoutUrl,
    isLoading,
    error,
  };
}

/**
 * Hook para verificar si un usuario ha realizado una compra
 */
export function useHasUserPurchased(email: string, productId?: string) {
  const { data, isLoading, error } = trpc.hotmart.hasUserPurchased.useQuery({
    email,
    productId,
  });

  return {
    purchased: data?.purchased ?? false,
    isLoading,
    error,
  };
}
