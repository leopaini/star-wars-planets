// Router
export interface IRouterProps {}

// Components
export interface IHomeProps {}
export interface ILoadingProps {}
export interface IPlanetInfoProps {}
export interface IPlanetCardProps {
  planet: IPlanet;
}

export interface IPlanetParams {
  id: string;
}

export interface ISorterProps {}

export interface ISort {
  sort: string;
  order: string;
}

export type EventChange = {
  name?: string | undefined;
  value: unknown;
};

// Store
export interface IState {
  items: IPlanet[];
  filtered: IPlanet[];
  next: string | null;
  filter: string | null;
}

export interface IProviderProps {
  children: React.ReactNode;
}

// API
export interface IResponse<T> {
  config: Object;
  data: T;
  headers: Object;
  request: Object;
  status: number;
  statusText: string;
}

export interface IData {
  count: number;
  next: string;
  previous: string;
  results: IPlanet[];
}

export interface ILink {
  next: string | null;
  prev: string | null;
}

export interface IPlanet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface IResident {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  url: string;
}

export interface IFilm {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}
