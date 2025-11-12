"use client";
import { useState } from "react";

interface Props {
  onFiltrar: (dataInicio: string, dataFim: string) => void;
}

export default function FiltroTempo({ onFiltrar }: Props) {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltrar(dataInicio, dataFim);
  };

  const handleLimpar = () => {
    setDataInicio("");
    setDataFim("");
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
              onChange={(e) => setDataInicio(e.target.value)}
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
              onChange={(e) => setDataFim(e.target.value)}
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
      </form>
    </div>
  );
}
