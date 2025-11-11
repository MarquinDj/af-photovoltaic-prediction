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
  const dadosFormatados = dados.map((d) => {
    const data = new Date(d.data);
    const dataAjustada = new Date(
      data.valueOf() + data.getTimezoneOffset() * 60 * 1000
    );
    return {
      data: format(dataAjustada, "MMM/yyyy", { locale: ptBR }),
      "Radiação UV (W/m²)": d.indice_uv,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosFormatados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" interval={30} />
        <YAxis
          label={{
            value: "Radiação UV (W/m²)",
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
          dataKey="Radiação UV (W/m²)"
          stroke="#691a97ff"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
