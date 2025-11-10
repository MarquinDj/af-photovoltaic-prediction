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
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Início
          </label>
          <input
            type="month"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Fim
          </label>
          <input
            type="month"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={handleLimpar}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Limpar
        </button>
      </div>
    </form>
  );
}
