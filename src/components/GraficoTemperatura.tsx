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
  const dadosFormatados = dados.map((d) => ({
    data: format(new Date(d.data), "MMM/yy", { locale: ptBR }),
    "Temp. Ambiente": Number((d.temperatura_2m - 273.15).toFixed(1)),
    "Temp. Módulo": Number((d.temperatura_modulo - 273.15).toFixed(1)),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosFormatados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" interval={30} />
        <YAxis
          domain={[15, 40]}
          label={{
            value: "Temperatura (°C)",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" },
          }}
        />
        <Tooltip />
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
