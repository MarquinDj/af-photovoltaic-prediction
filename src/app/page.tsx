"use client";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .schema("tcc_v2")
      .from("municipios")
      .select("*", { count: "exact", head: false })
      .then(({ count }) => setCount(count));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl">Teste de Conexão</h1>
      <p>Municípios no banco: {count ?? "Carregando..."}</p>
    </div>
  );
}
