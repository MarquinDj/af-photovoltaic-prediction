"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Municipio } from "../app/lib/types";

const Mapa = dynamic(() => import("../components/Mapa"), { ssr: false });

export default function Home() {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    router.push(`/municipio/${id}`);
  };

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
        )}
      </div>
    </main>
  );
}
