"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

// Mapeo de rutas a nombres
const routeNames: Record<string, string> = {
  "/": "Inicio",
  "/estacion-meteorologica": "Estación Meteorológica",
  "/estacion-energetica": "Estación Energética",
  "/datos-historicos": "Datos Históricos",
  "/objetivos": "Objetivos",
  "/resumen": "Resumen",
  "/creditos": "Créditos",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter(Boolean) // Elimina segmentos vacíos
    .filter((segment) => segment !== "pages"); // Filtra el segmento "pages"

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">{routeNames["/"]}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const name = routeNames[href] || segment; // Usa el nombre mapeado o el segmento si no está en el mapeo

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}