"use client"
import { useEffect } from "react";

export function useViewportHeight() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh(); // Ejecutar al cargar
    window.addEventListener("resize", setVh);

    return () => window.removeEventListener("resize", setVh);
  }, []);
}
