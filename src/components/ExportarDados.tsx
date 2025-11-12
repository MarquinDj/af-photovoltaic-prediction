"use client";
import { DadoMeteorologico, AFPrevisto } from "../app/lib/types";

interface ExportarDadosProps {
  nomeMunicipio: string;
  dadosMet: DadoMeteorologico[];
  dadosAF: any[];
  previsoes: AFPrevisto[];
}

export default function ExportarDados({
  nomeMunicipio,
  dadosMet,
  dadosAF,
  previsoes,
}: ExportarDadosProps) {
  const formatarData = (data: any): string => {
    try {
      const dataObj = new Date(data);
      return dataObj.toLocaleDateString("pt-BR");
    } catch {
      return String(data);
    }
  };

  const escaparCSV = (valor: any): string => {
    if (valor === null || valor === undefined) return "";
    const str = String(valor).replace(/"/g, '""');
    if (str.includes(",") || str.includes("\n") || str.includes('"')) {
      return `"${str}"`;
    }
    return str;
  };


  const arrayParaCSV = (dados: any[][]): string => {
    return dados.map((linha) => linha.map(escaparCSV).join(",")).join("\n");
  };

  const exportarMeteorologicos = () => {
    if (!dadosMet || dadosMet.length === 0) {
      alert("Nenhum dado meteorológico disponível para exportar");
      return;
    }

    const cabecalho = [
      "Município",
      "Data",
      "Temperatura 2m (K)",
      "Temperatura Módulo (K)",
      "Umidade Relativa (%)",
      "Índice UV ",
      "Radiação Solar (W/m²)",
    ];

    const linhas = dadosMet.map((dado) => [
      nomeMunicipio,
      formatarData(dado.data),
      dado.temperatura_2m?.toFixed(2) ?? "N/A",
      dado.temperatura_modulo?.toFixed(2) ?? "N/A",
      dado.umidade_relativa?.toFixed(2) ?? "N/A",
      dado.indice_uv?.toFixed(2) ?? "N/A",
      dado.radiacao_solar?.toFixed(2) ?? "N/A",
    ]);

    const csv = arrayParaCSV([cabecalho, ...linhas]);
    baixarCSV(csv, `${nomeMunicipio}_dados_meteorologicos`);
  };


  const exportarAF = () => {
    if (!dadosAF || dadosAF.length === 0) {
      alert("Nenhum dado de AF disponível para exportar");
      return;
    }

    const mapaData = new Map(dadosMet.map((dm) => [dm.id, dm.data]));

    const cabecalho = [
      "Município",
      "Data",
      "AF Temperatura",
      "AF Umidade",
      "AF UV",
      "AF Total",
    ];

    const linhas = dadosAF.map((dado) => {
      const data = mapaData.get(dado.dado_met_id) || dado.data;

      return [
        nomeMunicipio,
        data ? formatarData(data) : "N/A",
        dado.af_temp?.toFixed(4) ?? "N/A",
        dado.af_umidade?.toFixed(4) ?? "N/A",
        dado.af_uv?.toFixed(4) ?? "N/A",
        dado.af_total?.toFixed(4) ?? "N/A",
      ];
    });

    const csv = arrayParaCSV([cabecalho, ...linhas]);
    baixarCSV(csv, `${nomeMunicipio}_analise_af`);
  };

  const exportarPrevisoes = () => {
    if (!previsoes || previsoes.length === 0) {
      alert("Nenhuma previsão disponível para exportar");
      return;
    }

    const cabecalho = [
      "Município",
      "Data",
      "AF Total Previsto",
      "Limite Inferior",
      "Limite Superior",
    ];

    const linhas = previsoes.map((prev) => [
      nomeMunicipio,
      formatarData(prev.data),
      prev.af_total?.toFixed(4) ?? "N/A",
      prev.lim_inf?.toFixed(4) ?? "N/A",
      prev.lim_sup?.toFixed(4) ?? "N/A",
    ]);

    const csv = arrayParaCSV([cabecalho, ...linhas]);
    baixarCSV(csv, `${nomeMunicipio}_previsoes_af`);
  };

  const baixarCSV = (conteudo: string, nomeArquivo: string) => {
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + conteudo], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${nomeArquivo}.csv`;
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <svg
          className="w-6 h-6 mr-2 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Exportar Dados (CSV)
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Município: <span className="font-semibold">{nomeMunicipio}</span>
      </p>

      <div className="space-y-3">
        <button
          onClick={exportarMeteorologicos}
          disabled={!dadosMet.length}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 
            text-white font-semibold rounded-lg shadow-md
            hover:from-blue-600 hover:to-blue-700 
            disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
            transform hover:-translate-y-0.5 transition-all duration-200
            flex items-center justify-start gap-2
            cursor-pointer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Dados Meteorológicos
        </button>

        <button
          onClick={exportarAF}
          disabled={!dadosAF.length}
          className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 
            text-white font-semibold rounded-lg shadow-md
            hover:from-green-600 hover:to-green-700 
            disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
            transform hover:-translate-y-0.5 transition-all duration-200
            flex items-center justify-start gap-2
            cursor-pointer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Análise AF
        </button>

        <button
          onClick={exportarPrevisoes}
          disabled={!previsoes.length}
          className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 
            text-white font-semibold rounded-lg shadow-md
            hover:from-purple-600 hover:to-purple-700 
            disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
            transform hover:-translate-y-0.5 transition-all duration-200
            flex items-center justify-start gap-2
            cursor-pointer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Previsões AF
        </button>
      </div>
    </div>
  );
}
