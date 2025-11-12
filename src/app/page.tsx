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
import ExportarDados from "@/components/ExportarDados";
import Footer from "@/components/Footer";

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
  const [semDados, setSemDados] = useState(false);

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
      urlMet += `&data_inicio=${dataInicio}`;
      urlAF += `&data_inicio=${dataInicio}`;
      urlPrev += `&data_inicio=${dataInicio}`;
    }

    if (dataFim) {
      urlMet += `&data_fim=${dataFim}`;
      urlAF += `&data_fim=${dataFim}`;
      urlPrev += `&data_fim=${dataFim}`;
    }

    setLoadingDados(true);
    setSemDados(false);

    Promise.all([
      fetch(urlMet).then((r) => r.json()),
      fetch(urlAF).then((r) => r.json()),
      fetch(urlPrev).then((r) => r.json()),
    ]).then(([met, af, prev]) => {
      setDadosMet(met);
      setDadosAF(af);
      setPrevisoes(prev);

      if (met.length === 0) {
        setSemDados(true);
      }

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
    setSemDados(false);
  };

  const tabsData = [
    {
      label: "Dados Meteorológicos",
      content: (
        <div className="space-y-6">
          {/* Card Temperatura */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-red-500 rounded mr-3"></div>
              <h3 className="text-xl font-semibold text-gray-800">
                Temperatura
              </h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <GraficoTemperatura dados={dadosMet} />
            </div>
          </div>

          {/* Card Umidade */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-blue-500 rounded mr-3"></div>
              <h3 className="text-xl font-semibold text-gray-800">
                Umidade Relativa
              </h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <GraficoUmidade dados={dadosMet} />
            </div>
          </div>

          {/* Card UV */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-amber-500 rounded mr-3"></div>
              <h3 className="text-xl font-semibold text-gray-800">
                Radiação UV
              </h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <GraficoUV dados={dadosMet} />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Análise AF",
      content: (
        <div className="space-y-6">
          {/* Card Componentes AF */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-purple-500 rounded mr-3"></div>
              <h3 className="text-xl font-semibold text-gray-800">
                Componentes AF
              </h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <GraficoAF dados={dadosAF} />
            </div>
          </div>

          {/* Card AF Total */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-green-500 rounded mr-3"></div>
              <h3 className="text-xl font-semibold text-gray-800">AF Total</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <GraficoAFTotal dados={dadosAF} />
            </div>
          </div>

          {/* Card Previsão */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-1 h-8 bg-indigo-500 rounded mr-3"></div>
              <h3 className="text-xl font-semibold text-gray-800">
                Previsão AF
              </h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <GraficoPrevisao dados={previsoes} />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-xl text-gray-600 mt-4">
                Carregando municípios...
              </p>
            </div>
          ) : (
            <>
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Municípios do Ceará
                </h2>
                <p className="text-gray-600 mb-4">
                  Clique em um município no mapa para visualizar os dados
                </p>
                <Mapa
                  municipios={municipios}
                  onMunicipioClick={handleMunicipioClick}
                  municipioSelecionado={municipioSelecionado}
                />
              </div>

              {municipioSelecionado && (
                <div className="mt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <div>
                          <h2 className="text-3xl font-bold text-gray-800">
                            {municipioSelecionado.nome}
                          </h2>
                          <p className="text-gray-600">
                            Classificação Köppen:{" "}
                            {municipioSelecionado.class_koppen}
                          </p>
                        </div>
                        <button
                          onClick={limparSelecao}
                          className="px-6 py-2.5 bg-red-500 text-white font-medium rounded-lg 
                        hover:bg-red-600 active:bg-red-700 cursor-pointer
                        shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
                        transition-all duration-200"
                        >
                          ✕ Fechar
                        </button>
                      </div>
                      <div>
                        <FiltroTempo onFiltrar={handleFiltrar} />
                      </div>
                    </div>
                    <div>
                      <ExportarDados
                        nomeMunicipio={municipioSelecionado.nome}
                        dadosMet={dadosMet}
                        dadosAF={dadosAF}
                        previsoes={previsoes}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    {loadingDados ? (
                      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="text-xl text-gray-600 mt-4">
                          Carregando dados...
                        </p>
                      </div>
                    ) : semDados ? (
                      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                            <span className="text-3xl">📊</span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Sem dados disponíveis
                          </h3>
                          <p className="text-gray-600 text-lg">
                            Não há dados para o período especificado
                          </p>
                          <p className="text-gray-500 text-sm mt-2">
                            Tente selecionar um intervalo de datas diferente
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Tabs tabs={tabsData} />
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
