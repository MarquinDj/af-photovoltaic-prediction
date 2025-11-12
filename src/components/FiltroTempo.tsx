"use client";
import { useState } from "react";

interface Props {
  onFiltrar: (dataInicio: string, dataFim: string) => void;
}

export default function FiltroTempo({ onFiltrar }: Props) {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErro("");

    if ((dataInicio && !dataFim) || (!dataInicio && dataFim)) {
      setErro("Por favor, preencha ambas as datas (início e fim)");
      return;
    }

    if (dataInicio && dataFim) {
      const inicio = new Date(dataInicio);
      const fim = new Date(dataFim);

      if (fim < inicio) {
        setErro("A data final deve ser maior que a data inicial");
        return;
      }
    }

    onFiltrar(dataInicio, dataFim);
  };

  const handleLimpar = () => {
    setDataInicio("");
    setDataFim("");
    setErro("");
    onFiltrar("", "");
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Filtrar por Período
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Data Início
            </label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => {
                setDataInicio(e.target.value);
                setErro("");
              }}
              className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                       transition-all duration-200 cursor-pointer"
              placeholder="Selecione a data"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Data Fim
            </label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => {
                setDataFim(e.target.value);
                setErro("");
              }}
              className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                       transition-all duration-200 cursor-pointer"
              placeholder="Selecione a data"
            />
          </div>

          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg 
                       hover:bg-blue-700 active:bg-blue-800 
                       transition-colors duration-200 cursor-pointer
                       shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Filtrar
            </button>
          </div>

          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={handleLimpar}
              className="bg-gray-600 text-white font-medium px-6 py-2.5 rounded-lg 
                       hover:bg-gray-700 active:bg-gray-800 
                       transition-colors duration-200 cursor-pointer
                       shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Limpar Filtros
            </button>
          </div>
        </div>

        {erro && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center">
              <span className="text-red-500 text-xl mr-3">⚠️</span>
              <p className="text-sm font-medium text-red-700">{erro}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
