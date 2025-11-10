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
  Area,
} from "recharts";

import { AFPrevisto } from "../app/lib/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  dados: AFPrevisto[];
}

export default function GraficoAF({ dados }: Props) {
  const dadosFormatados = dados.map((d) => ({
    data: format(new Date(d.data), "MMM/yy", {
      locale: ptBR,
    }),
    "AF Previsto": Number(d.af_total.toFixed(2)),
    "Limite Inferior": Number(d.lim_inf.toFixed(2)),
    "Limite SUperior": Number(d.lim_sup.toFixed(2)),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={dadosFormatados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="Limite Superior"
          fill="#93c5fd"
          stroke="none"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="Limite Inferior"
          fill="#ffffff"
          stroke="none"
          fillOpacity={0.3}
        />
        <Line
          type="monotone"
          dataKey="AF Previsto"
          stroke="#3b82f6"
          strokeWidth={3}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
