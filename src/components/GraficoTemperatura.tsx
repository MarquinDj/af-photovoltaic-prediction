"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { DadoMeteorologico } from "../app/lib/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  dados: DadoMeteorologico[];
}

export default function GraficoTemperatura({ dados }: Props) {
  const dadosFormatados = dados.map((d) => {
    const data = new Date(d.data);
    const dataAjustada = new Date(
      data.valueOf() + data.getTimezoneOffset() * 60 * 1000
    );
    return {
      data: format(dataAjustada, "MMM/yyyy", { locale: ptBR }),
      "Temp. Ambiente": Number((d.temperatura_2m - 273.15).toFixed(1)),
      "Temp. Módulo": Number((d.temperatura_modulo - 273.15).toFixed(1)),
    };
  });
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosFormatados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis
          domain={[15, 40]}
          label={{
            value: "Temperatura (°C)",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" },
          }}
        />
        <Tooltip
          labelStyle={{
            color: "#000",
            fontWeight: "bold",
          }}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="Temp. Ambiente"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Temp. Módulo"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
