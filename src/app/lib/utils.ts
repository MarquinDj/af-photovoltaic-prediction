import { AFPrevisto } from "./types";

export const calcularMedia = (valores: number[]): number => {
  if (valores.length === 0) return 0;
  return valores.reduce((sum, val) => sum + val, 0) / valores.length;
};

export const extrairAFComponentes = (dados: any[]) => {
  return {
    temperatura: dados.map((d) => d.af_temp || 0).filter((v) => v > 0),
    umidade: dados.map((d) => d.af_umidade || 0).filter((v) => v > 0),
    uv: dados.map((d) => d.af_uv || 0).filter((v) => v > 0),
  };
};

export const calcularAFTotalMedio = (dados: any[]): number => {
  const valores = dados.map((d) => d.af_total || 0).filter((v) => v > 0);
  return calcularMedia(valores);
};

export const calcularDiferencaTemporal = (dados: any[]): string => {
  return "no período analisado";
};

export const analisarPrevisao = (previsoes: AFPrevisto[]) => {
  const valores = previsoes.map((p) => p.af_total || 0).filter((v) => v > 0);
  const media = calcularMedia(valores);

  const mesesMap = new Map<string, number[]>();
  previsoes.forEach((p) => {
    if (p.data && p.af_total) {
      const mes = new Date(p.data).toLocaleString("pt-BR", { month: "long" });
      if (!mesesMap.has(mes)) mesesMap.set(mes, []);
      mesesMap.get(mes)!.push(p.af_total);
    }
  });

  const mesesMenorAF = Array.from(mesesMap.entries())
    .map(([mes, valores]) => ({ mes, media: calcularMedia(valores) }))
    .sort((a, b) => a.media - b.media)
    .slice(0, 2)
    .map((m) => m.mes);

  return { media, mesesMenorAF };
};
