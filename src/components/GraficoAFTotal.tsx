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
  const dadosFormatados = dados.map((d) => ({
    data: format(new Date(d.dados_meteorologicos.data), "MMM/yy", {
      locale: ptBR,
    }),
    "AF Total": Number(d.af_total.toFixed(2)),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosFormatados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="AF Total" stroke="#f97316" />
      </LineChart>
    </ResponsiveContainer>
  );
}
