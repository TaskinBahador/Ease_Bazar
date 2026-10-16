"use client";

import type { ReactNode } from "react";

import { CartProvider } from "./context/CartContext";
import { LanguageProvider } from "./context/LanguageContext";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <LanguageProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </LanguageProvider>
  );
}