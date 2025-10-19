"use client";

import * as React from "react";
import { ChartBasic } from "@/components/chartBasic";
import { ComboboxDemo } from "@/components/combobox";
import { useEMData } from "@/app/scripts/conexion";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  MassConcentrationPm1p0: {
    label: "PM1.0",
    color: "rgba(75, 192, 192, 1)",
  },
  MassConcentrationPm2p5: {
    label: "PM2.5",
    color: "rgba(192, 75, 75, 1)",
  },
  MassConcentrationPm4p0: {
    label: "PM4.0",
    color: "rgba(75, 192, 75, 1)",
  },
  MassConcentrationPm10p0: {
    label: "PM10.0",
    color: "rgba(75, 75, 192, 1)",
  },
};

const variableOptions = Object.keys(chartConfig).map((key) => ({
  label: chartConfig[key as keyof typeof chartConfig].label,
  value: key,
}));

export function ChartEM() {
  const [timeRange, setTimeRange] = React.useState("90d");
  const [selectedVariables, setSelectedVariables] = React.useState<string[]>([
    "MassConcentrationPm1p0",
    "MassConcentrationPm2p5",
    "MassConcentrationPm10p0",
  ]);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  type EMDataItem = { timestamp: string; [key: string]: any }; // Define the type for rawData items
  const rawData: EMDataItem[] = useEMData(); // Obtén los datos desde Firebase

  // Filtrar los datos según el rango de tiempo seleccionado
  const filteredData = React.useMemo(() => {
    if (!rawData.length) return [];
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return rawData.filter((item) => {
      const date = new Date(item.timestamp);
      return date >= startDate;
    });
  }, [rawData, timeRange]);

  // Reducir la cantidad de puntos a renderizar
  const MAX_POINTS = 100; // Número máximo de puntos a renderizar
  const sampledData = React.useMemo(() => {
    if (!filteredData.length) return [];
    const step = Math.ceil(filteredData.length / MAX_POINTS); // Calcula el paso dinámico
    return filteredData.filter((_, index) => index % step === 0); // Selecciona 1 de cada "step" puntos
  }, [filteredData]);

  return (
    <Card>
      <CardHeader className="flex-1 items-center space-y-0 border-b py-0 ">
        <div className="flex  space-x-2 sm:flex-row gap-x-2">
          <CardTitle className="text-lg font-semibold">
            Concentración de Material Particulado
          </CardTitle>
          <div className="flex space-x-2">
            <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-gray-600 hover:text-gray-700 bg-white border-0"
                  onClick={() => setTooltipOpen((open) => !open)}
                >
                  <CircleHelp className="h-4 w-4" /> {/* Icono de ayuda */}
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                align="center" 
                className="min-h-12 max-w-[250px] text-justify text-white"
                style={{ textAlignLast: "center" }}
              >
                <span>
                  <strong className="text-justify">Material Particulado:</strong> <br />
                  Es la cantidad de partículas sólidas o líquidas suspendidas en 
                  el aire, que se miden generalmente en microgramos por metro 
                  cúbico (µg/m³).
                  <br/> 
                  Los índices más conocidos son: PM10 (partículas menores 
                  a 10 micrómetros) y PM2.5 (partículas menores a 2.5 micrómetros).
                </span>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center space-y-0 py-0 sm:flex-row justify-between">
          <CardDescription>
            Visualización de datos para el rango seleccionado
          </CardDescription>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-[160px] gap-4 rounded-lg sm:ml-auto"
              aria-label="Seleccionar rango de tiempo"
            >
              <SelectValue placeholder="Últimos 90 días" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 90 días
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 días
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 días
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        
        <ChartBasic
          data={sampledData} // Usar los datos muestreados
          selectedVariables={selectedVariables}
          chartConfig={chartConfig}
          yDomain={[0,"auto"]}
          ylabel="Concentración de Material Particulado (µg/m³)"
        />
        <ComboboxDemo
          items={variableOptions}
          onSelectionChange={setSelectedVariables}
        />
      </CardContent>
    </Card>
  );
}
