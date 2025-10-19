import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  Card, 
  CardContent, 
} from "@/components/ui/card"
import{
  Waypoints, 
  Target, 
  FileCode2,
  Leaf,
  Building2,
  LandPlot,
  ClipboardPenLine,
} from "lucide-react"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"


const Mainobjetivos = {
  items: [
    {
      numero: 1,
      color: "bg-rose-400",
      borde: "hover:border-rose-400",
      texto: "hover:text-rose-400",
      icono: Waypoints,
      titulo: "Objetivo 1",
      descripcion: "Identificar en la literatura los dispositivos, técnicas y herramientas para la gestión del consumo de energía eléctrica en edificios.",
      actividades: [
        {
          numero: 1,
          descripcion: "Consultar en textos bibliográficos y bases de datos de revistas científicas afines a los sistemas de monitoreo inteligentes.",
        },
        {
          numero: 2,
          descripcion: "Organizar la información y crear una lista con referencias bibliográficas en formato IEEE.",
        },
      ],
    },
    {
      numero: 2,
      color: "bg-rose-600",
      borde: "hover:border-rose-600",
      texto: "hover:text-rose-600",    
      icono: Target,
      titulo: "Objetivo 2",
      descripcion: "Adecuar y calibrar sensores para medir el consumo de energía eléctrica de una sección del edificio aulas generales de la Universidad Francisco de Paula Santander.",
      actividades: [
        {
          numero: 1,
          descripcion: "Recopilar información sobre los sensores necesarios y requeridos para medir las variables de interés planteadas.",
        },
        {
          numero: 2,
          descripcion: "Seleccionar y adquirir los sensores requeridos para medir las variables de interés en el sistema.",
        },
        {
          numero: 3,
          descripcion: "Realizar la calibración e instalación de los sensores adquiridos para una mayor precisión en la toma de datos.",
        },
      ],
    },
    {
      numero: 3,
      color: "bg-rose-800",
      borde: "hover:border-rose-800",
      texto: "hover:text-rose-800",
      icono: Leaf,
      titulo: "Objetivo 3",
      descripcion: "Diseñar e implementar un sistema para monitorizar variables ambientales relevantes en la parte exterior del edificio aulas generales.",
      actividades: [
        {
          numero: 1,
          descripcion: "Diseñar el sistema de monitoreo para medición de variables ambientales definidas para el área establecida.",
        },
        {
          numero: 2,
          descripcion: "Adquirir los sensores con las variables que se definieron para el proyecto.",
        },
        {
          numero: 3,
          descripcion: "Implementar el circuito electrónico para supervisar las variables ambientales.",
        },
        {
          numero: 4,
          descripcion: "Establecer comunicación remota con un servidor para visualizar las variables ambientales.",
        },
      ],
    },
    {
      numero: 4,
      color: "bg-rose-950",
      borde: "hover:border-rose-950",
      texto: "hover:text-rose-950",
      icono: Building2,
      titulo: "Objetivo 4",
      descripcion: "Diseñar e implementar un sistema de gestión energética para la iluminación y equipos de uso común en una sección del edificio aulas generales de la Universidad Francisco de Paula Santander.",
      actividades: [
        {
          numero: 1,
          descripcion: "Escoger los sensores y demás dispositivos necesarios para la gestión energética.",
        },
        {
          numero: 2,
          descripcion: "Diseñar e implementar el nodo sensor que medirá las condiciones de presencia de personas en las aulas de clase.",
        },
        {
          numero: 3,
          descripcion: "Diseñar e implementar los módulos actuadores que permitirán la conexión y desconexión automática de equipos e iluminación.",
        },
        {
          numero: 4,
          descripcion: "Realizar pruebas de funcionamiento de los nodos sensores y módulos actuadores.",
        },
      ],
    },
    {
      numero: 5,
      color: "bg-stone-400",
      borde: "hover:border-stone-400",
      texto: "hover:text-stone-400",
      icono: FileCode2,
      titulo: "Objetivo 5",
      descripcion: "Desarrollar una aplicación (móvil y/o web) que permita la monitorización remota de variables ambientales y consumo eléctrico del edificio aulas generales de la Universidad Francisco de Paula Santander.",
      actividades: [
        {
          numero: 1,
          descripcion: "Escoger las herramientas software que cumplan con los requerimientos y mejor se ajusten a las necesidades del proyecto.",
        },
        {
          numero: 2,
          descripcion: "Desarrollar el aplicativo que permita consultar en la base de datos del servidor la información y desplegarla en una pantalla en tiempo real.",
        },
        {
          numero: 3,
          descripcion: "Realizar pruebas de funcionamiento de la aplicación.",
        },
      ],
    },
    {
      numero: 6,
      color: "bg-stone-700",
      borde: "hover:border-stone-700",
      texto: "hover:text-stone-700",
      icono: ClipboardPenLine,
      titulo: "Objetivo 6",
      descripcion: "Evaluar el desempeño del sistema de gestión energética del edificio aulas generales de la Universidad Francisco de Paula Santander.",
      actividades: [
        {
          numero: 1,
          descripcion: "Medir y comparar diferentes métricas como latencia, tiempos de respuesta, precisión de los sensores, entre otras.",
        },
        {
          numero: 2,
          descripcion: "Medir y comparar el consumo eléctrico del edificio aulas generales de la Universidad Francisco de Paula Santander con y sin el sistema de gestión energética.",
        },
        {
          numero: 3,
          descripcion: "Divulgar los resultados con la elaboración de un informe final y artículos científicos.",
        },
      ],
    },
  ]
}

export default function ObjetivosPage() {
  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger>
                <Card
                  className={
                    `w-full h-56 rounded-lg justify-center items-center 
                     bg-sidebar hover:bg-white 
                     border-4 border-white hover:border-sidebar
                     text-white hover:text-sidebar 
                     shadow-md hover:shadow-lg 
                     transition-shadow duration-300 ease-in-out `
                  }
                >
                  <CardContent>
                    <LandPlot className="size-30" strokeWidth={1} />
                  </CardContent>
                </Card>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
              <div>Objetivo general</div>
            </TooltipContent>
          </Tooltip>
              <DialogContent className="justify-center text-justify p-8">
                <DialogHeader>
                  <DialogTitle className="font-extrabold text-gray-800 text-2xl">
                    Objetivo general
                  </DialogTitle>
                  <div className="font-medium text-gray-600 ">
                    Implementar un sistema que permita supervisar y gestionar el consumo de energía eléctrica del edificio Aulas Generales de la Universidad Francisco de Paula Santander.
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          <h1 className="text-3xl font-bold text-gray-800">Objetivos específicos</h1>
          <div className="grid auto-rows-min gap-2 md:grid-cols-3">
            {Mainobjetivos.items.map((objetivo, index) => {
              const IconComponent = objetivo.icono;
              return (
                <Dialog key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger>
                        <Card
                          className={
                            `w-full aspect-video justify-center items-center 
                            ${objetivo.color} hover:bg-white 
                            border-4 border-white ${objetivo.borde} 
                            text-white ${objetivo.texto}
                            shadow-md hover:shadow-lg 
                            transition-shadow duration-300 ease-in-out`
                          }
                        >
                          <CardContent>
                            <IconComponent className="size-30" strokeWidth={1} />
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="center">
                      <div>{objetivo.titulo}</div>
                    </TooltipContent>
                  </Tooltip>
                  <DialogContent className="justify-center text-justify p-8">
                    <DialogHeader>
                      <DialogTitle className="font-extrabold text-gray-800 text-2xl">{objetivo.titulo}</DialogTitle>
                      <div className="font-medium text-gray-600 ">
                      {objetivo.descripcion}
                      <div className="font-bold mt-4 text-gray-800">Actividades</div>
                        <div className="flex flex-col gap-2">
                          {objetivo.actividades.map((actividad, index) => (
                            <div key={index} className="flex flex-row gap-2">
                              <div className="font-bold  text-gray-800">{actividad.numero}. </div>
                              <div>{actividad.descripcion}</div>
                            </div>
                          ))}
                        </div>
                        </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </main>
    </div>
  );
}
