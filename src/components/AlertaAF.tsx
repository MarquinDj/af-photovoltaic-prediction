interface AlertaAFProps {
  tipo: "temperatura" | "umidade" | "uv" | "total" | "previsao";
  valor: number;
  mesesMenorAF?: string[];
  periodoTemporal?: string;
}

export default function AlertaAF({
  tipo,
  valor,
  mesesMenorAF,
  periodoTemporal,
}: AlertaAFProps) {
  if (valor < 2) return null;

  const alertas = {
    temperatura: {
      icone: "⚠️",
      titulo: "Alerta Térmico",
      mensagem: `A taxa de aceleração do envelhecimento (Af) médio de Temperatura está em ${valor.toFixed(
        2
      )}. Segundo Cassini et al. (2018), elevadas temperaturas podem causar a formação de gases (CO, CO₂), bolhas no encapsulante e delaminação. Além disso, temperaturas elevadas favorecem o surgimento de hotspots em interconexões degradadas.`,
      cor: "border-red-500 bg-red-50",
    },
    umidade: {
      icone: "💧",
      titulo: "Alerta de Umidade",
      mensagem: `A taxa de aceleração do envelhecimento (Af) médio de Umidade está em ${valor.toFixed(
        2
      )}. Conforme Hoffmann e Koehl (2012), umidade relativa elevada torna a superfície condutiva, podendo causar PID (Degradação Induzida por Potencial) e corrosão das interconexões metálicas. Há também risco de fissuras no backsheet devido ao efeito plastificante.`,
      cor: "border-blue-500 bg-blue-50",
    },
    uv: {
      icone: "☀️",
      titulo: "Alerta de UV",
      mensagem: `A taxa de aceleração do envelhecimento (Af) médio de Radiação UV está em ${valor.toFixed(
        2
      )}. De acordo com Aghaei et al. (2022), a exposição excessiva ao espectro UVB causa a quebra de ligações poliméricas, podendo causar descoloração (browning) do EVA e redução da potência óptica por absorção de luz.`,
      cor: "border-amber-500 bg-amber-50",
    },
    total: {
      icone: "📈",
      titulo: "Análise Histórica",
      mensagem: `O Fator de Aceleração (AF) médio ${
        periodoTemporal || "dos últimos 25 anos"
      } foi de ${valor.toFixed(
        2
      )}. Como este valor é superior a 2.0, segundo Hacke et al. (2023), isso implica em um envelhecimento precoce dos módulos, reduzindo a vida útil estimada para menos da metade do tempo de garantia e contribuindo para falhas estruturais aceleradas.`,
      cor: "border-green-500 bg-green-50",
    },
    previsao: {
      icone: "🔮",
      titulo: "Previsão Operacional",
      mensagem: `O envelhecimento acelerado estimado para o próximo ano será de ${valor.toFixed(
        2
      )}. É prudente agendar uma inspeção visual e termográfica nos meses de ${
        mesesMenorAF?.join(" e ") || "menor estresse"
      } para preparar o sistema para os meses de pico de degradação, garantindo uma eficiência energética, confibilidade e durabilidade do sistema (CORREA, 2023).`,
      cor: "border-indigo-500 bg-indigo-50",
    },
  };

  const alerta = alertas[tipo];

  return (
    <div className={`p-4 border-l-4 rounded-r-lg ${alerta.cor}`}>
      <div className="flex items-start">
        <span className="text-2xl mr-3">{alerta.icone}</span>
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">{alerta.titulo}</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {alerta.mensagem}
          </p>
        </div>
      </div>
    </div>
  );
}
