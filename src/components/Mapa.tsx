"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Municipio } from "../app/lib/types";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapaProps {
  municipios: Municipio[];
  onMunicipioClick: (id: number) => void;
}

export default function Mapa({ municipios, onMunicipioClick }: MapaProps) {
  return (
    <MapContainer
      center={[-5.0, -39.5]}
      zoom={7}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {municipios.map((m) => (
        <Marker
          key={m.id}
          position={[m.latitude, m.longitude]}
          eventHandlers={{
            click: () => onMunicipioClick(m.id),
          }}
        >
          <Popup>
            <div className="text-center">
              <strong>{m.nome}</strong>
              <br />
              <small>Clique para ver detalher</small>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
