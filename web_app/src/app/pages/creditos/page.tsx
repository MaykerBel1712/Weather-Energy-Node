import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Logo_ORDCID from "@/svgs/orcid";
import Logo_Scholar from "@/svgs/scholar";
import Link from "next/link";
import Image from "next/image";

const Autores = {
  navmain: [
    {
      Nombre: "Sergio Basilio Sepúlveda Mora",
      Profesión: "PhD en Ingeniería Eléctrica y Computación",
      Foto: "/images/ING-SERGIO-SEPULVEDA.jpg",
      Cargo: "Investigador principal",
      Orcid: "https://orcid.org/0000-0002-1248-7616",
      CVLAC: "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000998621",
      Scholar: "https://scholar.google.com.co/citations?user=5hcWp58AAAAJ&hl=en",
    },
    {
      Nombre: "Mario Joaquín Illera Bustos",
      Profesión: "MSc en Ingeniería Electrónica",
      Foto: "/images/Illera-Mario.jpg",
      Cargo: "Coinvestigador",
      Orcid: "https://orcid.org/0000-0003-4269-2140",
      CVLAC: "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000007280",
      Scholar: "https://scholar.google.com/citations?user=jLjYhJ4AAAAJ&hl=en",
    },
    {
      Nombre: "Maiker Andres Beltran Serrano",
      Profesión: "Estudiante en Ingeniería Electrónica",
      Foto: "/images/Beltran-Mayker_Andres.jpg",
      Cargo: "Estudiante vinculado",
      Orcid: "https://orcid.org/0000-0002-6661-414X",
      CVLAC: "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0002000026",
      Scholar: "https://scholar.google.com/citations?user=eEJU6F4AAAAJ&hl=en",
    },
    {
      Nombre: "Jesús Stiven López Soto",
      Profesión: "Estudiante en Ingeniería Electrónica",
      Foto: "/images/Jesus.jpg",
      Cargo: "Estudiante vinculado",
      Orcid: "https://orcid.org/0000-0001-9353-093X",
      CVLAC: "https://scienti.minciencias.gov.co/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0002012769",
      Scholar: "https://scholar.google.com/citations?hl=es&user=73NtSgcAAAAJ&view_op=list_works&authuser=1&gmla=AJsN-F6jCJEbO75eAlTYJAP7v9GLU0e_hiCnZ2MvvQkxCW1Lj3ynNh1DG75DADM_MCYwMSHq5Qak1J5JuVg70ZfSgxRKMNdBIdZJ8vMtU6MQJsVUASSa5Kg",
    },
  ],
};

export default function Creditos() {
  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <h1 className="text-2xl font-bold">Autores</h1>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-2">
          {/* Mapeo de los datos de Autores */}
          {Autores.navmain.map((autor, index) => (
            <Card
              key={index}
              className="bg-white rounded-xl shadow-md flex flex-row items-center p-4 gap-4"
            >
              {/* Foto del autor */}
              <div className="flex flex-col flex-1 items-center justify-center relative w-[95%] max-w-[120px] aspect-square rounded-4xl overflow-hidden border-4 border-sidebar-accent-foreground/5">
                <Image
                  src={autor.Foto as string}
                  alt={autor.Nombre}
                  layout="fill"
                  className="rounded-4xl object-cover"
                />
              </div>

              {/* Información del autor */}
              <div className="flex flex-col flex-1">
                <CardHeader className="p-0">
                  <CardTitle>{autor.Nombre}</CardTitle>
                  <CardDescription>{autor.Profesión}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-2">
                  <p className="text-sm text-muted-foreground">{autor.Cargo}</p>
                </CardContent>
                <CardFooter className="p-0 mt-4 flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-stone-50 hover:text-sidebar-accent-foreground bg-sidebar hover:bg-sidebar-accent items-center justify-center"
                      >
                        <Link
                          href={autor.Orcid}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Logo_ORDCID className="w-6 h-6" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="center">
                      <div>Código Orcid</div>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-stone-50 hover:text-sidebar-accent-foreground bg-sidebar hover:bg-sidebar-accent items-center justify-center text-xs font-medium"
                      >
                        <Link
                          href={autor.CVLAC}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          CVLAC
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="center">
                      <div>CVLAC</div>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-stone-50 hover:text-sidebar-accent-foreground bg-sidebar hover:bg-sidebar-accent items-center justify-center"
                      >
                        <Link
                          href={autor.Scholar}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Logo_Scholar className="w-8 h-6" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="center">
                      <div>Google Scholar</div>
                    </TooltipContent>
                  </Tooltip>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}