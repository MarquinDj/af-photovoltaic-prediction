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
      "AF Total": Number(d.af_total.toFixed(2)),
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
          dataKey="AF Total"
          stroke="#f97316"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
