# Archivos Gerber de las PCB

Este directorio contiene los archivos **Gerber** generados para la fabricación de las diferentes placas de circuito impreso (PCB) del proyecto en la plataforma EasyEDA. Cada carpeta corresponde a un módulo o sistema específico dentro del diseño general.

## 📁 Estructura de carpetas

- **Gerber_ModuloDeteccion_PCB_ModuloDeteccion**  
  Contiene los archivos Gerber del módulo encargado de la detección de eventos o señales en el sistema.

- **Gerber_ModuloSSR_PCB_ModuloSSR**  
  Incluye los archivos Gerber del módulo de control mediante relés de estado sólido (SSR).

- **Gerber_PCB_1_Energia_PCB_PCB_1_Energia**  
  Archivos Gerber correspondientes al módulo de gestión y monitoreo de energía eléctrica.

- **Gerber_PCB_2_Weather_PCB_PCB_2_Weather**  
  Archivos Gerber del módulo meteorológico para la medición de variables ambientales (temperatura, humedad, presión, etc.).

## 📜 Descripción general

Los archivos Gerber son los utilizados por los fabricantes de PCB para producir las placas físicas.  
Cada carpeta contiene los siguientes tipos de archivos típicos:

- `.gbr` o `.ger` → Capas de cobre, máscara, serigrafía, etc.  
- `.drl` → Archivo de perforación (taladros).  
- `.txt` o `.gbl/.gtl/.gts` → Capas inferiores/superiores y detalles de fabricación.

## ⚙️ Recomendaciones para fabricación

- Verificar las dimensiones y el grosor del PCB antes de enviar a fabricación.  
- Asegurarse de incluir los archivos de taladros (`.drl`) y la vista previa del ensamblaje si el fabricante lo solicita.  
- Se recomienda usar un fabricante como **JLCPCB**, **PCBWay** o similar.  
- Todos los diseños han sido generados y revisados con **KiCad** (o el software de diseño utilizado en el proyecto).

