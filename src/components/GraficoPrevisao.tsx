"use client";

import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ErrorBar,
} from "recharts";

import { AFPrevisto } from "../app/lib/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  dados: AFPrevisto[];
}

export default function GraficoAF({ dados }: Props) {
  const dadosFormatados = dados.map((d) => {
    const data = new Date(d.data);
    const dataAjustada = new Date(
      data.valueOf() + data.getTimezoneOffset() * 60 * 1000
    );
    return {
      data: format(dataAjustada, "MMM/yyyy", { locale: ptBR }),
      "AF Previsto": Number(d.af_total.toFixed(2)),
      "Erro Inferior": Number((d.af_total - d.lim_inf).toFixed(2)),
      "Erro Superior": Number((d.lim_sup - d.af_total).toFixed(2)),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={dadosFormatados}>
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
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
            fontSize: "14px",
            fontWeight: "600",
            color: "#1f2937",
          }}
        />
        <Line
          type="monotone"
          dataKey="AF Previsto"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: "#3b82f6", r: 4 }}
        >
          <ErrorBar
            dataKey="Erro Inferior"
            direction="y"
            width={6}
            strokeWidth={2}
            stroke="#93c5fd"
          />
          <ErrorBar
            dataKey="Erro Superior"
            direction="y"
            width={6}
            strokeWidth={2}
            stroke="#93c5fd"
          />
        </Line>
      </ComposedChart>
    </ResponsiveContainer>
  );
}
