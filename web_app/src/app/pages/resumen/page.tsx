import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  DollarSign,
  Briefcase,
  Users,
  Cpu,
} from "lucide-react";
import Link from "next/link";

const Beneficios = {
  items: [
    {
      titulo: "Beneficios Económicos",
      descripcion:
        "La implementación del sistema de gestión energética reducirá los costos operativos asociados al consumo de energía en el edificio Aulas Generales.",
      icono: DollarSign,
      color: "bg-rose-600",
      borde: "hover:border-rose-600",
      texto: "hover:text-rose-600",
    },
    {
      titulo: "Beneficios Empresariales",
      descripcion:
        "La publicación de los resultados en una revista indexada y su presentación en congresos contribuirá a mejorar la reputación de la Universidad Francisco de Paula Santander, resaltándola como una institución comprometida con la investigación y desarrollo.",
      icono: Briefcase,
      color: "bg-rose-950",
      borde: "hover:border-rose-950",
      texto: "hover:text-rose-950",
    },
    {
      titulo: "Beneficios Sociales",
      descripcion:
        "El proyecto contribuirá a la concienciación de la comunidad universitaria sobre la importancia del uso adecuado de la energía eléctrica, promoviendo prácticas sostenibles que ayudarán a mitigar el impacto ambiental a largo plazo.",
      icono: Users,
      color: "bg-stone-400",
      borde: "hover:border-stone-400",
      texto: "hover:text-stone-400",
    },
    {
      titulo: "Beneficios Tecnológicos",
      descripcion:
        "El proyecto promoverá el uso de redes de sensores y automatización por medio del Internet de las Cosas (IoT), optimizando el uso de la energía eléctrica en espacios académicos y desarrollando tecnologías aplicadas a la gestión energética.",
      icono: Cpu,
      color: "bg-stone-600",
      borde: "hover:border-stone-600",
      texto: "hover:text-stone-600",
    },
  ],
};

export default function resumen() {
    return (           
    <div>
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl gap-4 font-bold">Introducción</h1>
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full">
          <CardContent className="grid px-12 gap-2">
            <div className="flex flex-col text-justify gap-2">
            <p>Uno de los parámetros más importantes para la mayoría de los países y empresas es la eficiencia energética&nbsp; 
            <Link href="https://ieeexplore.ieee.org/document/9465101" target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Mir, Abbasi, Mir, Kanwal, & Alamri, 2021)
            </Link>
            , debido a que un nivel insuficiente de la misma representa pérdidas económicas y ambientales, así como el detrimento de la vida útil de 
            ciertos sistemas electrónicos. A su vez, Colombia se ha comprometido con los Objetivos de Desarrollo Sostenible de la ONU, por lo que uno
             de sus desafíos es lograr reducir el impacto ambiental ocasionado por las diversas actividades industriales, entre ellas la producción energética.</p>
            
            <p>Sumado a ello, la evolución de la educación en paralelo con la evolución de la tecnología, particularmente la dependencia de dispositivos 
              electrónicos y sistemas que requieren energía eléctrica para su funcionamiento, han marcado un cambio significativo en el panorama educativo
               moderno&nbsp;
            <Link href="https://www.593dp.com/index.php/593_Digital_Publisher/article/view/347" target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Lopez, 2020)
            </Link>.
             Este cambio, por consecuente, genera desafíos en la gestión de dicho consumo energético que se evidencia tanto en lugares residenciales
              como en entornos académicos.</p>
            
            <p>La Universidad Francisco de Paula Santander no queda exenta de la problemática mencionada, en particular para el desarrollo de este 
              proyecto, se toma el edificio de Aulas Generales como foco, el cual también se enfrenta a la problemática del malgasto de energía eléctrica 
              y todos los impactos negativos que esto genera que no son solo en el aspecto económico sino también un impacto ambiental adverso.</p>
            
            <p>La complejidad de monitorear estos espacios académicos radica en la dinámica de las aulas de clases, donde la congregación de 
              muchos individuos hace que una cantidad considerable de dispositivos que consumen energía eléctrica se encuentren encendidos con 
              frecuencia, muchas veces incluso de manera innecesaria cuando se concluyen las actividades académicas. Esto genera un derroche de 
              energía y recursos los cuales pueden ser evitados&nbsp;
              <Link href="https://ieeexplore.ieee.org/document/9329037" target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Krishna & Perumal, 2021)
              </Link>.</p>
            
            <p>Se evidencia que en varias investigaciones relacionadas a eficiencia energética en automatización de procesos han optado por 
              el uso de redes inalámbricas de sensores (Wireless Sensor Networks, WSN), debido a la capacidad de monitoreo que éstas permiten. 
              Adicionalmente, se observa que el consumo de las WSN puede minimizarse dependiendo de su configuración, dando así una ventana de 
              posibilidades para el tema de estudio&nbsp;
              <Link href="https://ieeexplore.ieee.org/document/10064298" target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Chaurasiya et al., 2023)
              </Link>.</p>
            
            <p>La Universidad Francisco de Paula Santander, siendo una institución de educación superior comprometida con la calidad educativa 
              y con la sostenibilidad, hace un reconocimiento de la necesidad imperativa de abordar esta problemática.</p>
            
            <p>Por ello se precisa plantear un sistema de gestión energética inteligente para el conjunto de alumbrado y equipos de uso común 
              de una sección delimitada del bloque Aulas Generales, basado en el internet de las cosas (IoT) para el monitoreo preciso de las 
              variables eléctricas del edificio&nbsp;
              <Link href="https://ieeexplore.ieee.org/document/9465101" target="_blank" rel="noopener noreferrer" className="text-sidebar">
                (Gururaj et al., 2023)
              </Link>, 
              así como el desarrollo de un sistema de monitoreo de variables ambientales para concientizar al usuario de su entorno.
            </p>
            </div>
            
          </CardContent>
        </Card>
      </div>
      <h1 className="text-2xl gap-4 font-bold">Planteamiento del problema</h1>
        <Card className="w-full">
          <CardContent className="grid px-12 gap-2">
          <div className="flex flex-col gap-2 text-justify">
            <p>La educación en los tiempos de antaño no se veía afectada por la escasez o inexistencia de la energía eléctrica, puesto que esta se fundamentaba en otras metodologías de enseñanza o actividades que eran contemporáneas a los recursos con los que se contaban en esos momentos de la historia humana&nbsp; 
            <Link href="https://gc.scalahed.com/recursos/files/r161r/w25116w/Historia_general_de_la_educacion.pdf" target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Salas, 2012)
            </Link>
            . Sin embargo, la evolución tecnológica propiciada por la electricidad ha diversificado las herramientas educativas, generando una mayor dependencia de dispositivos electrónicos, iluminación artificial, sistemas de proyección, y otros recursos alimentados por la energía eléctrica&nbsp; 
            <Link href="https://www.indteca.com/ojs/index.php/Revista_Scientific/article/view/387" target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Calderón Pujadas, 2019)
            </Link> .</p>
            
            <p>En la actualidad, la energía eléctrica es un recurso indispensable para casi todos los aspectos de la vida y de las actividades cotidianas del ser humano moderno. También, ésta es un bien sumamente importante para la educación, más específicamente, la educación superior, ya que esta juega un papel fundamental en el desarrollo de actividades académicas por parte de los estudiantes universitarios&nbsp;
            <Link href="https://visualizingenergy.org/what-is-the-relationship-between-energy-use-and-level-of-education/#:~:text=Electrification%20of%20the%20classroom%20enables,strengthens%20teacher%20recruitment%20and%20retention." target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Cleveland, 2023)
            </Link>.
             Por otro lado, este consumo también implica un costo tanto económico como ambiental por el impacto que pueda generar al entorno educativo. Los estudiantes de educación superior son concientes de dicho impacto ambiental&nbsp; 
            <Link href="https://gc.scalahed.com/recursos/files/r161r/w25116w/Historia_general_de_la_educacion.pdf" target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Restrepo-Santiesteban, Tocarruncho-Parra, & Ortiz-Riaga, 2022)
            </Link>
            , lo cual se puede usar en pro de la reducción del consumo energético.</p>
            
            <p>El seguimiento y la gestión del consumo energético a lo largo del tiempo han sido fundamentales para contrarrestar gastos innecesarios, reducir la contaminación y controlar los derroches de energía que conllevan impactos negativos. No obstante, monitorear los desperdicios de energía en entornos académicos resulta más desafiante que en ámbitos residenciales&nbsp; 
            <Link href="https://gc.scalahed.com/recursos/files/r161r/w25116w/Historia_general_de_la_educacion.pdf" target="_blank" rel="noopener noreferrer" className="text-sidebar">
               (De La Hoz, Guerrero, & Beleño, 2021)
            </Link>.</p>
            
            <p>Esta disparidad se debe, en gran medida, a la considerable cantidad de individuos presentes en un aula en comparación con un entorno doméstico. Un factor clave radica en la dinámica de un salón de clases: tras la finalización de una sesión educativa, es común que los equipos eléctricos, como ventiladores, luces, pizarras electrónicas, proyectores, entre otros, permanezcan encendidos innecesariamente. Esta práctica genera un significativo desperdicio de energía eléctrica, lo que se traduce en impactos económicos y ambientales adversos.</p>

	          <p>En el contexto específico la Universidad Francisco de Paula Santander no está exenta de esta problemática de desperdicio de energía. En sus edificios se evidencia esta situación de malgasto energético. En el edificio de Aulas Generales ubicado frente al departamento de Electricidad y Electrónica se evidencia este derroche energético. Para ello, se propone un modelo de monitoreo inteligente, con redes de sensores los cuales tomen los datos suficientes para determinar la ausencia de estudiantes y poder mitigar el desperdicio energético&nbsp;
              <Link href="https://ieeexplore.ieee.org/document/9050775" target="_blank" rel="noopener noreferrer" className="text-sidebar">
               (Metallidou, Psannis, & Egyptiadou, 2020; Al-Ghaili, Kasim, Al-Hada, Othman, & Saleh, 2020)
              </Link>.</p>
            
            <p>El Internet de las Cosas (Internet of Things, IoT) puede facilitar la gestión energética mediante el uso de sensores que pueden medir diferentes variables físicas o ambientales relacionadas con el consumo eléctrico&nbsp;
              <Link href="10.1109/ICICoS56336.2022.9930559" target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Estella, Ghayatrie, Levina, & Prasetyo, 2022)
              </Link>, como el voltaje, la corriente, la potencia, la temperatura, la humedad, la luz, el sonido, el movimiento, etc. Estos sensores pueden transmitir los datos a una plataforma (móvil o web) que puede procesarlos y analizarlos para obtener información útil sobre el estado y el comportamiento del sistema eléctrico&nbsp;
              <Link href="https://doi.org/10.5772/658" target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Merrett & Tan, 2010)
              </Link>. Asimismo, la plataforma puede enviar órdenes o comandos a ciertos actuadores para modificar o ajustar el consumo eléctrico según las necesidades o preferencias de los usuarios&nbsp;
              <Link href="file:///C:/Users/USUARIO/Downloads/Dialnet-SistemaDeMonitoreoRemotoDelConsumoEnergeticoParaHo-7659382%20(1).pdf" target="_blank" rel="noopener noreferrer" className="text-sidebar">
              (Jimenez & Cabrera, 2020)
              </Link>.</p>
            
            <p>Con lo anteriormente mencionado se plantea la siguiente pregunta:</p>
            <p className="text-center text-2xl font-bold"><b> ¿Cómo desarrollar un sistema para la gestión de energía eléctrica del edificio aulas generales de la UFPS usando el Internet de las Cosas?</b></p>
            </div>
          </CardContent>
        </Card>
        <h1 className="text-2xl gap-4 font-bold">Beneficios</h1>
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          {Beneficios.items.map((beneficio, index) => {
            const IconComponent = beneficio.icono;
            return (
              <Dialog key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger>
                      <Card
                        className={`w-full h-40 flex items-center justify-center 
                          ${beneficio.color} hover:bg-white 
                          border-4 border-white ${beneficio.borde} 
                          text-white ${beneficio.texto} 
                          shadow-md hover:shadow-lg 
                          transition-shadow duration-300 ease-in-out`}
                      >
                        <CardContent>
                          <IconComponent className="size-20" strokeWidth={2} />
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="center">
                    <div>{beneficio.titulo}</div>
                  </TooltipContent>
                  </Tooltip>
                <DialogContent className="text-justify p-8">
                  <DialogHeader>
                    <DialogTitle className="font-extrabold text-gray-800 text-2xl">
                      {beneficio.titulo}
                    </DialogTitle>
                    <p className="font-medium text-justify text-gray-600">
                      {beneficio.descripcion}
                    </p>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
    </main>
    </div>
    
    )
  }