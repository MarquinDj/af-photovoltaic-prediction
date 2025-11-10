"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Municipio, DadoMeteorologico, AFPrevisto } from "../../lib/types";
import GraficoTemperatura from "@/components/GraficoTemperatura";
import GraficoUmidade from "@/components/GraficoUmidade";
import GraficoAF from "@/components/GraficoAF";
import GraficoAFTotal from "@/components/GraficoAFTotal";
import GraficoPrevisao from "@/components/GraficoPrevisao";
import { af } from "date-fns/locale";
import FiltroTempo from "@/components/FiltroTempo";

export default function MunicipioPage() {
  const params = useParams();
  const router = useRouter();
  const municipioId = params.id;

  const [municipio, setMunicipio] = useState<Municipio | null>(null);
  const [dadosMet, setDadosMet] = useState<DadoMeteorologico[]>([]);
  const [dadosAF, setDadosAF] = useState<any[]>([]);
  const [previsoes, setPrevisoes] = useState<AFPrevisto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/v1/municipios`).then((r) => r.json()),
      fetch(`/api/v1/dados-meteorologicos?municipio_id=${municipioId}`).then(
        (r) => r.json()
      ),
      fetch(`/api/v1/af?municipio_id=${municipioId}`).then((r) => r.json()),
      fetch(`/api/v1/af-previsto?municipio_id=${municipioId}`).then((r) =>
        r.json()
      ),
    ]).then(([municipios, met, af, prev]) => {
      setMunicipio(
        municipios.find((m: Municipio) => m.id === Number(municipioId))
      );
      setDadosMet(met);
      setDadosAF(af);
      setPrevisoes(prev);
      setLoading(false);
    });
  }, [municipioId]);

  const carregarDados = (dataInicio?: string, dataFim?: string) => {
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

    setLoading(true);
    Promise.all([
      fetch(urlMet).then((r) => r.json()),
      fetch(urlAF).then((r) => r.json()),
      fetch(urlPrev).then((r) => r.json()),
    ]).then(([met, af, prev]) => {
      setDadosMet(met);
      setDadosAF(af);
      setPrevisoes(prev);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetch(`/api/v1/municipios`)
      .then((r) => r.json())
      .then((municipios) => {
        setMunicipio(
          municipios.find((m: Municipio) => m.id === Number(municipioId))
        );
      });
    carregarDados();
  }, [municipioId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Carregando dados...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <button
          onClick={() => router.push("/")}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ← Voltar ao Mapa
        </button>

        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {municipio?.nome}
          </h1>
          <p className="text-gray-600">
            Classificação Köppen: {municipio?.class_koppen}
          </p>
        </header>

        <div className="mb-6">
          <FiltroTempo onFiltrar={carregarDados} />
        </div>

        <div className="space-y-8">
          {/* Dados Meteorológicos */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Dados Meteorológicos
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Temperatura</h3>
                <GraficoTemperatura dados={dadosMet} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Umidade Relativa</h3>
                <GraficoUmidade dados={dadosMet} />
              </div>
            </div>
          </section>

          {/* Análise AF */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Análise AF
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Componentes AF</h3>
                <GraficoAF dados={dadosAF} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">AF Total</h3>
                <GraficoAFTotal dados={dadosAF} />
              </div>
            </div>
          </section>

          {/* Previsão */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Previsão AF
            </h2>
            <GraficoPrevisao dados={previsoes} />
          </section>
        </div>
      </div>
    </main>
  );
}
