"use client";
import { descargarCSV } from "@/app/scripts/conexion";
import { ComboboxDemo } from "@/components/combobox";
import { DatePickerWithRange } from "@/components/datepicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CircleArrowDown } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DateRange } from "react-day-picker";

export default function DatosHistoricos() {
  const customItems = [
    { label: "Estación Meteorológica", value: "estacionmeteorologica" },
    { label: "Estación Energética", value: "estacionenergetica" },
  ];

  const [selectedTipo, setSelectedTipo] = React.useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 2, 19), // Fecha predeterminada
    to: new Date(), // Fecha actual
  });

  const handleSelectionChange = (selectedValues: string[]) => {
    setSelectedTipo(selectedValues);
  };

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range); // Actualiza el rango de fechas seleccionado
  };

  const handleDownload = () => {
    if (selectedTipo.length === 0) {
      setIsDialogOpen(true); // Abre el diálogo si no hay selección
      return;
    }

    // Usa el rango predeterminado si no se selecciona uno
    const from = new Date(dateRange?.from || new Date(2025, 2, 19));
    from.setHours(0, 0, 0, 0); // Establece la hora a las 00:00:00

    const to = new Date(dateRange?.to || new Date());
    to.setHours(23, 59, 59, 999); // Establece la hora a las 23:59:59

    // Si hay más de un tipo seleccionado, pasa "ambas"
    const tipo = selectedTipo.length > 1 ? "ambas" : selectedTipo[0];
    descargarCSV(tipo, from, to); // Pasa las fechas normalizadas
  };

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">Datos Históricos</h1>
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full">
            <CardContent className="grid gap-4">
              <div className="flex flex-col gap-2">
                En esta sección puedes consultar los datos históricos de las estaciones
                meteorológicas y de las mediciones energéticas. Selecciona el tipo de dato que
                deseas consultar y el rango de fechas.
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-col">
                  <div className="text-sm font-medium">Tipo de dato</div>
                  <ComboboxDemo
                    items={customItems}
                    onSelectionChange={handleSelectionChange}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-sm font-medium">Rango de fechas</div>
                  <DatePickerWithRange onDateChange={handleDateChange} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="default"
                size="sm"
                className="gap-2 bg-gray-900 hover:bg-gray-100 text-white hover:text-gray-900"
                onClick={handleDownload}
              >
                Descargar
                <CircleArrowDown className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selección requerida</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Por favor, selecciona al menos un tipo de dato y un rango de fechas antes de descargar.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="default" 
              onClick={() => setIsDialogOpen(false)} 
              className="gap-2 bg-gray-900 hover:bg-gray-100 text-white hover:text-gray-900">
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}