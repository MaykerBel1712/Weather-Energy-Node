import { ChartI } from "@/components/charts/estacion-energetica/chart_I"
import { ChartPT } from "@/components/charts/estacion-energetica/chart_PT"
import { ChartQT } from "@/components/charts/estacion-energetica/chart_QT"
import { ChartST } from "@/components/charts/estacion-energetica/char_ST"

export default function estacionEnergetica() {
    return (
      
        <div>
               
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">    
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                <ChartI />
                <ChartPT />
                <ChartQT />
                <ChartST />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
        </main>
      </div>
    
    )
  }