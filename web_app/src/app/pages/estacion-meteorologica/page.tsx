import { ChartEM } from "@/components/charts/estacion_meteorologica/chartEM";
import { ChartVOC } from "@/components/charts/estacion_meteorologica/chartVOC";
import { ChartIrradiance } from "@/components/charts/estacion_meteorologica/chartIrradicance";
import { ChartAmbientHumidity } from "@/components/charts/estacion_meteorologica/chartHumidity";
import { ChartAmbientTemperature } from "@/components/charts/estacion_meteorologica/chartTemp";
import { ChartWindSpeed } from "@/components/charts/estacion_meteorologica/chartWindSpeed";

export default function estacionMeteorologica() {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-bold">Estación Meteorológica</h1>
        <div className="grid auto-rows-min gap-4 ">
        
          <div className="flex flex-col gap-4">
            <ChartEM />
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <ChartAmbientHumidity />
            <ChartAmbientTemperature/>
            <ChartVOC />
            <ChartIrradiance/>
            <ChartWindSpeed/>
          </div>
        </div>
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
      </div>
    )
  }