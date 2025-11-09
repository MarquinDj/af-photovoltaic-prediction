export interface Municipio {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  class_koppen: string;
}

export interface DadoMeteorologico {
  id: number;
  municipio_id: number;
  data: string;
  indice_uv: number;
  radiacao_solar: number;
  temperatura_2m: number;
  temperatura_modulo: number;
  umidade_relatira: number;
}

export interface AF {
  id: number;
  municipio_id: number;
  dado_met_id: number;
  af_temp: number;
  af_umidade: number;
  af_uv: number;
  af_total: number;
}

export interface AFPrevisto {
  id: number;
  municipio_id: number;
  data: string;
  af_total: number;
}
