'use client' // Garante que este código é executado no cliente

import { useRouter } from "next/navigation";

export default function useMercadoPago() {
    const router = useRouter();

    async function createMercadoPagoCheckout({
        testeId,
        userEmail
    }: {
        testeId: string;
        userEmail?: string;
    }) {
        try {
            const response = await fetch("/api/mercado-pago/create-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    testeId,
                    userEmail,
                }),
            });

            const data = await response.json();

            if (data.initPoint) {
                router.push(data.initPoint); // Redireciona para o checkout do Mercado Pago
            } else {
                console.error("Erro: Não foi possível obter o ponto de inicialização do pagamento.");
            }

        } catch (error) {
            console.error("Error creating Mercado Pago checkout:", error);
            throw error;
        }
    }

    return {
        createMercadoPagoCheckout,
    };
}
