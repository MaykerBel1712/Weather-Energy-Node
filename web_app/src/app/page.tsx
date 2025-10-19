import { Card, CardContent } from "@/components/ui/card"
import { TimelineLayout } from"@/components/timeline-layout"

export default function Home() {
  return (
    <div>    
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">    
      <div className="flex flex-1 flex-col gap-2">
      <h1 className="text-2xl gap-4 font-bold">Resumen del proyecto</h1>
        <div className="flex flex-col gap-2 px-12">
          <Card className="w-full">
          <CardContent className="grid py-0 gap-2 text-justify">
            La Universidad Francisco de Paula Santander, comprometida con 
            la sostenibilidad y la eficiencia energética, financia a través 
            del Fondo de Investigación FINU el desarrollo de un sistema 
            inteligente de supervisión y gestión del consumo eléctrico 
            en el edificio Aulas Generales. Este espacio, caracterizado 
            por su alta demanda energética debido al uso constante de 
            equipos electrónicos, será intervenido con tecnologías modernas 
            basadas en el Internet de las Cosas (IoT), integrando sensores 
            para medir variables eléctricas (tensión, corriente, potencia) 
            y ambientales (temperatura, humedad, material particulado, 
            velocidad del ambiente). El objetivo es optimizar el uso de 
            la energía, reducir el desperdicio ocasionado por malas 
            prácticas y promover una cultura de consumo responsable. 
            El proyecto incluye la creación de una plataforma digital 
            para el monitoreo remoto, así como el diseño, implementación 
            y evaluación de los sistemas desarrollados, proponiendo un 
            modelo escalable y replicable que articule investigación, 
            innovación tecnológica y conciencia ambiental.
          </CardContent>
        </Card>
        </div>
        <h1 className="text-2xl gap-4 font-bold">Metodología</h1>
        <Card className="w-full">
          <CardContent className="grid px-12 py-0 gap-2 ">
            <div className="flex flex-col gap-2 text-center">
              <TimelineLayout />
            </div>
          </CardContent>
        </Card>
        
        
      </div>
    </main>
    </div>
  
  )
}

