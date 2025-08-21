// SWAPI Response Types
export interface SwapiCharacter {
  uid: string;
  name: string;
  url: string;
}

export interface SwapiCharacterDetail {
  uid: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiPlanet {
  uid: string;
  name: string;
  climate: string;
  terrain: string;
  population: string;
  diameter: string;
  gravity: string;
  orbital_period: string;
  rotation_period: string;
  surface_water: string;
  created: string;
  edited: string;
  url: string;
}

export interface SwapiFilm {
  uid: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiSpecies {
  uid: string;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiVehicle {
  uid:string;
  created: string;
  edited: string;
  consumables: string;
  name: string;
  cargo_capacity: string;
  passengers: string;
  max_atmosphering_speed: string;
  crew: string;
  length: string;
  model: string;
  cost_in_credits: string;
  manufacturer: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  url: string;
};

export interface SwapiStarship {
  uid: string;
  created: string;
  edited: string;
  consumables: string;
  name: string;
  cargo_capacity: string;
  passengers: string;
  max_atmosphering_speed: string;
  crew: string;
  length: string;
  model: string;
  cost_in_credits: string;
  manufacturer: string;
  starship_class: string;
  hyperdrive_rating: string;
  MGLT: string;
  pilots: string[];
  films: string[];
  url: string;
}

// SWAPI API Response Wrappers
export interface SwapiListResponse<T> {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: T[];
}

export interface SwapiDetailResponse<T> {
  message: string;
  result: {
    properties: T;
    description: string;
    _id: string;
    uid: string;
    __v: number;
  };
}