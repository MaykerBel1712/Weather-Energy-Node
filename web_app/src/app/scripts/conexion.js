"use client";

import { database } from "@/app/firebaseConfig";
import { ref, onValue, get } from "firebase/database";
import React from "react";

export function useEMData() {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    const emRef = ref(database, "/Estacion_Meteorologica");

    onValue(emRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map((key) => ({
          timestamp: data[key].timestamp,
          MassConcentrationPm1p0: data[key].MassConcentrationPm1p0,
          MassConcentrationPm2p5: data[key].MassConcentrationPm2p5,
          MassConcentrationPm4p0: data[key].MassConcentrationPm4p0,
          MassConcentrationPm10p0: data[key].MassConcentrationPm10p0,
          AmbientHumidity: data[key].AmbientHumidity,
          AmbientTemperature: data[key].AmbientTemperature,
          VocIndex: data[key].VocIndex,
          NoxIndex: data[key].NoxIndex,
          Irradiance: data[key].Irradiance,
          WindSpeed: data[key].WindSpeed,
        }));

        setChartData(formattedData);
      } else {
        console.error("No existen datos en la base de datos.");
      }
    });
  }, []);

  return chartData;
}

export function useEnergeticData() {
  const [chartDataEN, setChartDataEN] = React.useState([]);

  React.useEffect(() => {
    const energeticRef = ref(database, "/EstacionEnergetica");

    onValue(energeticRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map((key) => ({
          timestamp: data[key].timestamp,
          Demanda_I1: data[key].Demanda_I1,
          Demanda_I2: data[key].Demanda_I2,
          Demanda_I3: data[key].Demanda_I3,
          Demanda_Max_I1: data[key].Demanda_Max_I1,
          Demanda_Max_I2: data[key].Demanda_Max_I2,
          Demanda_Max_I3: data[key].Demanda_Max_I3,
          Demanda_Max_PTS_VA: data[key].Demanda_Max_PTS_VA,
          Demanda_PTS_W: data[key].Demanda_PTS_W,
          Demanda_TS_VA: data[key].Demanda_TS_VA,
          ETE: data[key].ETE,
          ETI: data[key].ETI,
          F: data[key].F,
          FP1: data[key].FP1,
          FP2: data[key].FP2,
          FP3: data[key].FP3,
          FPT: data[key].FPT,
          I1: data[key].I1,
          I2: data[key].I2,
          I3: data[key].I3,
          IN: data[key].IN,
          ITHD_1: data[key].ITHD_1,
          ITHD_2: data[key].ITHD_2,
          ITHD_3: data[key].ITHD_3,
          ITHD_Prom: data[key].ITHD_Prom,
          PA1: data[key].PA1,
          PA2: data[key].PA2,
          PA3: data[key].PA3,
          PAT: data[key].PAT,
          PR1: data[key].PR1,
          PR2: data[key].PR2,
          PR3: data[key].PR3,
          PRT: data[key].PRT,
          Prom_I_L: data[key].Prom_I_L,
          Prom_VTHD_LN: data[key].Prom_VTHD_LN,
          Prom_VTHD_L_L: data[key].Prom_VTHD_L_L,
          Prom_volts_L_N: data[key].Prom_volts_L_N,
          Suma_I_L: data[key].Suma_I_L,
          T_Ah: data[key].T_Ah,
          T_KVAh: data[key].T_KVAh,
          Tkvarh: data[key].Tkvarh,
          Tkwh: data[key].Tkwh,
          V1: data[key].V1,
          V2: data[key].V2,
          V3: data[key].V3,
          VA1: data[key].VA1,
          VA2: data[key].VA2,
          VA3: data[key].VA3,
          VAT: data[key].VAT,
          VTHD_1_2: data[key].VTHD_1_2,
          VTHD_2_3: data[key].VTHD_2_3,
          VTHD_3_1: data[key].VTHD_3_1,
          VTHD_LN_1: data[key].VTHD_LN_1,
          VTHD_LN_2: data[key].VTHD_LN_2,
          VTHD_LN_3: data[key].VTHD_LN_3,
          V_1_2: data[key].V_1_2,
          V_2_3: data[key].V_2_3,
          V_3_1: data[key].V_3_1,
          V_prom_L_L: data[key].V_prom_L_L,
          kVArhTE: data[key].kVArhTE,
          kVArhTI: data[key].kVArhTI,
        }));

        setChartDataEN(formattedData);
      } else {
        console.error("No existen datos en la base de datos para EstacionEnergetica.");
      }
    });
  }, []);

  return chartDataEN;
}

export async function descargarCSV(tipo, from, to) {
  const generarYDescargarCSV = (nombreArchivo, contenido) => {
    const encodedUri = encodeURI(contenido);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", nombreArchivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (tipo === "estacionmeteorologica" || tipo === "estacionenergetica") {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Configura las columnas del CSV según el tipo de datos
    if (tipo === "estacionmeteorologica") {
      csvContent += "Timestamp,MassConcentrationPm1p0,MassConcentrationPm2p5,MassConcentrationPm4p0,MassConcentrationPm10p0,AmbientHumidity,AmbientTemperature,VocIndex,NoxIndex,Irradiance,WindSpeed\n";
    } else if (tipo === "estacionenergetica") {
      csvContent += "Timestamp,Demanda_I1,Demanda_I2,Demanda_I3,Demanda_Max_I1,Demanda_Max_I2,Demanda_Max_I3,Demanda_Max_PTS_VA,Demanda_PTS_W,Demanda_TS_VA,ETE,ETI,F,FP1,FP2,FP3,FPT,I1,I2,I3,IN,ITHD_1,ITHD_2,ITHD_3,ITHD_Prom,PA1,PA2,PA3,PAT,PR1,PR2,PR3,PRT,Prom_I_L,Prom_VTHD_LN,Prom_VTHD_L_L,Prom_volts_L_N,Suma_I_L,T_Ah,T_KVAh,Tkvarh,Tkwh,V1,V2,V3,VA1,VA2,VA3,VAT,VTHD_1_2,VTHD_2_3,VTHD_3_1,VTHD_LN_1,VTHD_LN_2,VTHD_LN_3,V_1_2,V_2_3,V_3_1,V_prom_L_L,kVArhTE,kVArhTI\n";
    }

    // Define la referencia de Firebase según el tipo
    const referencia = tipo === "estacionmeteorologica"
      ? ref(database, "/Estacion_Meteorologica")
      : ref(database, "/EstacionEnergetica");

    // Obtén los datos de la referencia
    const snapshot = await get(referencia);
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (let key in data) {
        const timestamp = new Date(data[key].timestamp);
        if (timestamp >= from && timestamp <= to) {
          const row = [data[key].timestamp];
          if (tipo === "estacionmeteorologica") {
            row.push(
              data[key].MassConcentrationPm1p0,
              data[key].MassConcentrationPm2p5,
              data[key].MassConcentrationPm4p0,
              data[key].MassConcentrationPm10p0,
              data[key].AmbientHumidity,
              data[key].AmbientTemperature,
              data[key].VocIndex,
              data[key].NoxIndex,
              data[key].Irradiance,
              data[key].WindSpeed
            );
          } else if (tipo === "estacionenergetica") {
            row.push(
              data[key].Demanda_I1,
              data[key].Demanda_I2,
              data[key].Demanda_I3,
              data[key].Demanda_Max_I1,
              data[key].Demanda_Max_I2,
              data[key].Demanda_Max_I3,
              data[key].Demanda_Max_PTS_VA,
              data[key].Demanda_PTS_W,
              data[key].Demanda_TS_VA,
              data[key].ETE,
              data[key].ETI,
              data[key].F,
              data[key].FP1,
              data[key].FP2,
              data[key].FP3,
              data[key].FPT,
              data[key].I1,
              data[key].I2,
              data[key].I3,
              data[key].IN,
              data[key].ITHD_1,
              data[key].ITHD_2,
              data[key].ITHD_3,
              data[key].ITHD_Prom,
              data[key].PA1,
              data[key].PA2,
              data[key].PA3,
              data[key].PAT,
              data[key].PR1,
              data[key].PR2,
              data[key].PR3,
              data[key].PRT,
              data[key].Prom_I_L,
              data[key].Prom_VTHD_LN,
              data[key].Prom_VTHD_L_L,
              data[key].Prom_volts_L_N,
              data[key].Suma_I_L,
              data[key].T_Ah,
              data[key].T_KVAh,
              data[key].Tkvarh,
              data[key].Tkwh,
              data[key].V1,
              data[key].V2,
              data[key].V3,
              data[key].VA1,
              data[key].VA2,
              data[key].VA3,
              data[key].VAT,
              data[key].VTHD_1_2,
              data[key].VTHD_2_3,
              data[key].VTHD_3_1,
              data[key].VTHD_LN_1,
              data[key].VTHD_LN_2,
              data[key].VTHD_LN_3,
              data[key].V_1_2,
              data[key].V_2_3,
              data[key].V_3_1,
              data[key].V_prom_L_L,
              data[key].kVArhTE,
              data[key].kVArhTI
            );
          }
          csvContent += row.join(",") + "\n";
        }
      }
    } else {
      console.error(`No hay datos disponibles para descargar (${tipo}).`);
    }

    // Genera y descarga el archivo CSV
    generarYDescargarCSV(`${tipo}.csv`, csvContent);
  } else if (tipo === "ambas") {
    // Descargar ambos archivos
    await descargarCSV("estacionmeteorologica", from, to);
    await descargarCSV("estacionenergetica", from, to);
  }
}


