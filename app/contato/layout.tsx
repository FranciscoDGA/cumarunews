import type { Metadata } from "next";
import { pageAlternates } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a redação do CumaruNews. Envie sua pauta, denúncia, direito de resposta ou sugestão.",
  alternates: pageAlternates("/contato"),
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
