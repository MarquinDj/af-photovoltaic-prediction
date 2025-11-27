import { AFComData, AFPrevisto } from "./types";

export const calcularMedia = (valores: number[]): number => {
  if (valores.length === 0) return 0;
  return valores.reduce((sum, val) => sum + val, 0) / valores.length;
};

export const extrairAFComponentes = (dados: AFComData[]) => {
  return {
    temperatura: dados.map((d) => d.af_temp || 0).filter((v) => v > 0),
    umidade: dados.map((d) => d.af_umidade || 0).filter((v) => v > 0),
    uv: dados.map((d) => d.af_uv || 0).filter((v) => v > 0),
  };
};

export const calcularAFTotalMedio = (dados: AFComData[]): number => {
  const valores = dados.map((d) => d.af_total || 0).filter((v) => v > 0);
  return calcularMedia(valores);
};

export const calcularDiferencaTemporal = (dados: AFComData[]): string => {
  return "no período analisado";
};

export const analisarPrevisao = (previsoes: AFPrevisto[]) => {
  const valores = previsoes.map((p) => p.af_total || 0).filter((v) => v > 0);
  const media = calcularMedia(valores);

  const mesesMap = new Map<string, number[]>();
  previsoes.forEach((p) => {
    if (p.data && p.af_total) {
      const [ano, mes] = p.data.split("T")[0].split("-");
      const dataObj = new Date(parseInt(ano), parseInt(mes) - 1, 1);

      const mesAno = dataObj.toLocaleString("pt-BR", {
        month: "long",
        year: "numeric",
      });
      if (!mesesMap.has(mesAno)) mesesMap.set(mesAno, []);
      mesesMap.get(mesAno)!.push(p.af_total);
    }
  });

  const mesesMenorAF = Array.from(mesesMap.entries())
    .map(([mesAno, valores]) => ({
      mesAno,
      media: calcularMedia(valores),
      data: mesAno,
    }))
    .sort((a, b) => a.media - b.media)
    .slice(0, 2)
    .sort((a, b) => {
      const parseData = (str: string) => {
        const meses: { [key: string]: number } = {
          janeiro: 0,
          fevereiro: 1,
          março: 2,
          abril: 3,
          maio: 4,
          junho: 5,
          julho: 6,
          agosto: 7,
          setembro: 8,
          outubro: 9,
          novembro: 10,
          dezembro: 11,
        };
        const [mes, ano] = str.split(" de ");
        return new Date(parseInt(ano), meses[mes.toLowerCase()], 1);
      };
      return parseData(a.mesAno).getTime() - parseData(b.mesAno).getTime();
    })
    .map((m) => m.mesAno);

  return { media, mesesMenorAF };
};
