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

export default function GraficoUV({ dados }: Props) {
  const dadosFormatados = dados.map((d) => ({
    data: format(new Date(d.data), "MMM/yy", { locale: ptBR }),
    "Radiação UV (W/m²)": d.indice_uv,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosFormatados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis
          label={{
            value: "Radiação UV (W/m²)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Radiação UV (W/m²)"
          stroke="#691a97ff"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
