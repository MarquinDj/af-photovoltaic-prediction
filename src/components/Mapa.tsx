"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Municipio } from "../app/lib/types";

interface MapaProps {
  municipios: Municipio[];
  onMunicipioClick: (id: number) => void;
}

export default function Mapa({ municipios, onMunicipioClick }: MapaProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [geoData, setGeoData] = useState<any>(null);


  useEffect(() => {
    d3.json("/ceara-municipios.geojson").then((data) => {
      setGeoData(data);
    });
  }, []);


  useEffect(() => {
    if (!geoData || !svgRef.current || municipios.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = 500;

    svg.selectAll("*").remove();

    const projection = d3.geoMercator().fitSize([width, height], geoData);
    const pathGenerator = d3.geoPath().projection(projection);

    const g = svg.append("g");

    const municipioMap = new Map(
      municipios.map((m) => [m.nome.toUpperCase(), m])
    );


    g.selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("class", "municipio-path")
      .attr("fill", (d: any) => {
        const municipio = municipioMap.get(d.properties.name?.toUpperCase());
        return municipio ? "#3b82f6" : "#e5e7eb";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .style("cursor", "pointer")
      .on("mouseover", function (event, d: any) {
        d3.select(this).attr("fill", "#1e40af").attr("stroke-width", 2);

        const municipio = municipioMap.get(d.properties.name?.toUpperCase());
        if (municipio) {
          showTooltip(event, municipio);
        }
      })
      .on("mouseout", function (event, d: any) {
        const municipio = municipioMap.get(d.properties.name?.toUpperCase());
        d3.select(this)
          .attr("fill", municipio ? "#3b82f6" : "#e5e7eb")
          .attr("stroke-width", 0.5);

        hideTooltip();
      })
      .on("click", function (event, d: any) {
        const municipio = municipioMap.get(d.properties.name?.toUpperCase());
        if (municipio) {
          onMunicipioClick(municipio.id);
        }
      });

    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);
  }, [geoData, municipios, onMunicipioClick]);

  const showTooltip = (event: any, municipio: Municipio) => {
    const tooltip = d3.select("#map-tooltip");
    tooltip
      .style("display", "block")
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 28 + "px")
      .html(
        `<strong>${municipio.nome}</strong><br/><small>Clique para ver detalhes</small>`
      );
  };

  const hideTooltip = () => {
    d3.select("#map-tooltip").style("display", "none");
  };

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        style={{
          width: "100%",
          height: "500px",
          backgroundColor: "#f3f4f6",
        }}
      />
      <div
        id="map-tooltip"
        style={{
          position: "absolute",
          display: "none",
          padding: "8px 12px",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "4px",
          pointerEvents: "none",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          fontSize: "14px",
        }}
      />
    </div>
  );
}
