import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .schema("tcc_v2")
    .from("municipios")
    .select("*")
    .order("nome");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
