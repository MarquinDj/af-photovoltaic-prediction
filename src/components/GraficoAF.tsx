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
    "AF Temperatura": Number(d.af_temp.toFixed(3)),
    "AF Umidade": Number(d.af_umidade.toFixed(3)),
    "AF UV": Number(d.af_uv.toFixed(3)),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dadosFormatados}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="AF Temperatura" stroke="#ef4444" />
        <Line type="monotone" dataKey="AF Umidade" stroke="#3b82f6" />
        <Line type="monotone" dataKey="AF UV" stroke="#f59e0b" />
      </LineChart>
    </ResponsiveContainer>
  );
}
