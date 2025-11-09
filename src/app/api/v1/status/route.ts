import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET() {
  const updatedAt = new Date().toISOString();
  const { data: pgVersion, error: errorPgVersion } = await supabase.rpc(
    "get_server_version"
  );
  const { data: pgMaxConnections, error: errorPgMaxConnections } =
    await supabase.rpc("get_server_max_connections");
  const { data: pgOpenedConnections, error: errorOpenedConnections } =
    await supabase.rpc("get_server_opened_connections");

  if (errorPgVersion) {
    return NextResponse.json(
      { error: errorPgVersion.message },
      { status: 500 }
    );
  }

  if (errorPgMaxConnections) {
    return NextResponse.json(
      { error: errorPgMaxConnections.message },
      { status: 500 }
    );
  }

  if (errorOpenedConnections) {
    return NextResponse.json(
      { error: errorOpenedConnections.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    update_at: updatedAt,
    dependencies: {
      version: pgVersion,
      max_connections: pgMaxConnections,
      opened_connections: pgOpenedConnections,
    },
  });
}
