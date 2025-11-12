import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const municipioId = searchParams.get("municipio_id");
  const dataInicio = searchParams.get("data_inicio");
  const dataFim = searchParams.get("data_fim");

  let query = supabase
    .schema("tcc_v2")
    .from("af")
    .select(`*, dados_meteorologicos!inner(data)`);

  if (municipioId) {
    query = query.eq("municipio_id", municipioId);
  }

  if (dataInicio) {
    query = query.gte("dados_meteorologicos.data", dataInicio);
  }

  if (dataFim) {
    query = query.lte("dados_meteorologicos.data", dataFim);
  }

  const { data, error } = await query.order("dados_meteorologicos(data)");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
