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

import { AFComData } from "../app/lib/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  dados: AFComData[];
}

export default function GraficoAF({ dados }: Props) {
  const dadosFormatados = dados.map((d) => {
    const data = new Date(d.dados_meteorologicos.data);
    const dataAjustada = new Date(
      data.valueOf() + data.getTimezoneOffset() * 60 * 1000
    );
    return {
      data: format(dataAjustada, "MMM/yyyy", { locale: ptBR }),
      "AF Temperatura": Number(d.af_temp.toFixed(3)),
      "AF Umidade": Number(d.af_umidade.toFixed(3)),
      "AF UV": Number(d.af_uv.toFixed(3)),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosFormatados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
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
          dataKey="AF Temperatura"
          stroke="#ef4444"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="AF Umidade"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="AF UV"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
