"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const ChartBasic = React.memo(function ChartBasic({
  data,
  selectedVariables,
  chartConfig,
  yDomain,
  ylabel,
}: {
  data: any[];
  selectedVariables: string[];
  chartConfig: Record<string, { label: string; color: string }>;
  yDomain: [number, string];
  ylabel: string;
}) {
  return (
    <ChartContainer config={chartConfig} className="aspect-video w-full">
      <AreaChart data={data}>
        <defs>
          {selectedVariables.map((variable) => (
            <linearGradient
              key={variable}
              id={`fill${variable}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={chartConfig[variable].color}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={chartConfig[variable].color}
                stopOpacity={0.1}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("es-ES", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <YAxis
          type="number"
          domain={yDomain} // Ajusta automáticamente el rango del eje Y
          tickLine={false}
          axisLine={false}
          label={{
            value: ylabel, // Texto del label
            angle: -90, // Rotación antihoraria
            position: "insideLeft", // Posición del label
            style: { text: "xs", textAnchor: "middle", fill: "#666" }, // Estilo del texto
          }}

          tickMargin={8}
          padding={{ top: 10, bottom: 10 }}
          allowDataOverflow={true}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("es-ES", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
              indicator="dot"
            />
          }
        />
        {selectedVariables.map((variable) => (
          <Area
            key={variable}
            dataKey={variable}
            type="natural"
            fill={`url(#fill${variable})`}
            stroke={chartConfig[variable].color}
          />
        ))}
        <ChartLegend
          content={
            <ChartLegendContent  />
          }
        />
      </AreaChart>
    </ChartContainer>
  );
});