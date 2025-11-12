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
  const exportarCSV = (dados: any[], nomeArquivo: string) => {
    if (!dados || dados.length === 0) {
      alert("Nenhum dado disponível para exportar");
      return;
    }

    const headers = Object.keys(dados[0]).join(",");
    const rows = dados.map((obj) => Object.values(obj).join(","));
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${nomeMunicipio}_${nomeArquivo}.csv`;
    link.click();
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
          onClick={() => exportarCSV(dadosMet, "dados_meteorologicos")}
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
          onClick={() => exportarCSV(dadosAF, "analise_af")}
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
          onClick={() => exportarCSV(previsoes, "previsoes_af")}
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
