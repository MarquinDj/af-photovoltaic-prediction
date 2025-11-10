"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Municipio, DadoMeteorologico, AFPrevisto } from "../app/lib/types";
import GraficoTemperatura from "@/components/GraficoTemperatura";
import GraficoUmidade from "@/components/GraficoUmidade";
import GraficoUV from "@/components/GraficoUV";
import GraficoAF from "@/components/GraficoAF";
import GraficoAFTotal from "@/components/GraficoAFTotal";
import GraficoPrevisao from "@/components/GraficoPrevisao";
import FiltroTempo from "@/components/FiltroTempo";
import Tabs from "@/components/Tabs";

const Mapa = dynamic(() => import("../components/Mapa"), { ssr: false });

export default function Home() {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState(true);

  const [municipioSelecionado, setMunicipioSelecionado] =
    useState<Municipio | null>(null);
  const [dadosMet, setDadosMet] = useState<DadoMeteorologico[]>([]);
  const [dadosAF, setDadosAF] = useState<any[]>([]);
  const [previsoes, setPrevisoes] = useState<AFPrevisto[]>([]);
  const [loadingDados, setLoadingDados] = useState(false);

  useEffect(() => {
    fetch("/api/v1/municipios")
      .then((res) => res.json())
      .then((data) => {
        setMunicipios(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleMunicipioClick = (id: number) => {
    const municipio = municipios.find((m) => m.id === id);
    setMunicipioSelecionado(municipio || null);
    carregarDados(id);
  };

  const carregarDados = (
    municipioId: number,
    dataInicio?: string,
    dataFim?: string
  ) => {
    let urlMet = `/api/v1/dados-meteorologicos?municipio_id=${municipioId}`;
    let urlAF = `/api/v1/af?municipio_id=${municipioId}`;
    let urlPrev = `/api/v1/af-previsto?municipio_id=${municipioId}`;

    if (dataInicio) {
      urlMet += `&data_inicio=${dataInicio}-01`;
      urlAF += `&data_inicio=${dataInicio}-01`;
      urlPrev += `&data_inicio=${dataInicio}-01`;
    }

    if (dataFim) {
      urlMet += `&data_fim=${dataFim}-01`;
      urlAF += `&data_fim=${dataFim}-01`;
      urlPrev += `&data_fim=${dataFim}-01`;
    }

    setLoadingDados(true);
    Promise.all([
      fetch(urlMet).then((r) => r.json()),
      fetch(urlAF).then((r) => r.json()),
      fetch(urlPrev).then((r) => r.json()),
    ]).then(([met, af, prev]) => {
      setDadosMet(met);
      setDadosAF(af);
      setPrevisoes(prev);
      setLoadingDados(false);
    });
  };

  const handleFiltrar = (dataInicio?: string, dataFim?: string) => {
    if (municipioSelecionado) {
      carregarDados(municipioSelecionado.id, dataInicio, dataFim);
    }
  };

  const limparSelecao = () => {
    setMunicipioSelecionado(null);
    setDadosMet([]);
    setDadosAF([]);
    setPrevisoes([]);
  };

  const tabsData = [
    {
      label: "Dados Meteorológicos",
      content: (
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Dados Meteorológicos
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Temperatura
              </h3>
              <GraficoTemperatura dados={dadosMet} />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Umidade Relativa
              </h3>
              <GraficoUmidade dados={dadosMet} />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Radiacao UV
              </h3>
              <GraficoUV dados={dadosMet} />
            </div>
          </div>
        </section>
      ),
    },
    {
      label: "Análise AF",
      content: (
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Análise AF
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">
                  Componentes AF
                </h3>
                <GraficoAF dados={dadosAF} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">
                  AF Total
                </h3>
                <GraficoAFTotal dados={dadosAF} />
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Previsão AF
            </h2>
            <GraficoPrevisao dados={previsoes} />
          </section>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sistema de Avaliação da taxa de aceleração de envelhecimento
            Fotovoltaico
          </h1>
          <p className="text-gray-600">Análise de Dados Ambientais - Ceará</p>
        </header>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Carregando municípios...</p>
          </div>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-black mb-4">
                Municípios do Ceará
              </h2>
              <p className="text-gray-600 mb-4">
                Clique em um município no mapa para visualizar os dados
              </p>
              <Mapa
                municipios={municipios}
                onMunicipioClick={handleMunicipioClick}
              />
            </div>

            {municipioSelecionado && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {municipioSelecionado.nome}
                    </h2>
                    <p className="text-gray-600">
                      Classificação Köppen: {municipioSelecionado.class_koppen}
                    </p>
                  </div>
                  <button
                    onClick={limparSelecao}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    ✕ Fechar
                  </button>
                </div>

                <div className="mb-6">
                  <FiltroTempo onFiltrar={handleFiltrar} />
                </div>

                {loadingDados ? (
                  <div className="text-center py-12">
                    <p className="text-xl text-gray-600">Carregando dados...</p>
                  </div>
                ) : (
                  <Tabs tabs={tabsData} />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
