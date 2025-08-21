import { Character, Planet, Film, Species, Vehicles, Starship } from "../types/api";
import {
  SwapiCharacter,
  SwapiCharacterDetail,
  SwapiPlanet,
  SwapiFilm,
  SwapiSpecies,
  SwapiVehicle,
  SwapiStarship,
} from "../types/swapi";
import { swapiClient } from "./swapiClient";

export class DataTransformer {
  // Transform SWAPI character list item to our Character format
  static transformCharacterListItem(
    swapiCharacter: SwapiCharacter
  ): Partial<Character> {
    return {
      id: swapiCharacter.uid,
      name: swapiCharacter.name,
      image_url: `https://starwars-visualguide.com/assets/img/characters/${swapiCharacter.uid}.jpg`,
    };
  }

  // Transform SWAPI character detail to our Character format
  static async transformCharacterDetail(
    swapiCharacter: SwapiCharacterDetail
  ): Promise<Character> {
    const character: Character = {
      id: swapiCharacter.uid,
      name: swapiCharacter.name,
      height: swapiCharacter.height,
      mass: swapiCharacter.mass,
      hair_color: swapiCharacter.hair_color,
      skin_color: swapiCharacter.skin_color,
      eye_color: swapiCharacter.eye_color,
      birth_year: swapiCharacter.birth_year,
      gender: swapiCharacter.gender,
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      image_url: `https://starwars-visualguide.com/assets/img/characters/${swapiCharacter.uid}.jpg`,
      created: swapiCharacter.created,
      edited: swapiCharacter.edited,
    };

    // Transform homeworld if available
    if (swapiCharacter.homeworld) {
      try {
        const homeworldId = swapiClient.extractIdFromUrl(
          swapiCharacter.homeworld
        );
        if (homeworldId) {
          const swapiPlanet = await swapiClient.getPlanetById(homeworldId);
          character.homeworld = this.transformPlanet(swapiPlanet);
        }
      } catch (error) {
        console.warn(
          `Failed to fetch homeworld for character ${character.id}:`,
          error
        );
      }
    }

    // Transform films
    if (swapiCharacter.films && swapiCharacter.films.length > 0) {
      const filmPromises = swapiCharacter.films.map(async (filmUrl) => {
        try {
          const filmId = swapiClient.extractIdFromUrl(filmUrl);
          if (filmId) {
            const swapiFilm = await swapiClient.getFilmById(filmId);
            return this.transformFilm(swapiFilm);
          }
        } catch (error) {
          console.warn(`Failed to fetch film ${filmUrl}:`, error);
        }
        return null;
      });

      const films = await Promise.all(filmPromises);
      character.films = films.filter((film): film is Film => film !== null);
    }

    // Transform species
    if (swapiCharacter.species && swapiCharacter.species.length > 0) {
      const speciesPromises = swapiCharacter.species.map(async (speciesUrl) => {
        try {
          const speciesId = swapiClient.extractIdFromUrl(speciesUrl);
          if (speciesId) {
            const swapiSpecies = await swapiClient.getSpeciesById(speciesId);
            return this.transformSpecies(swapiSpecies);
          }
        } catch (error) {
          console.warn(`Failed to fetch species ${speciesUrl}:`, error);
        }
        return null;
      });

      const species = await Promise.all(speciesPromises);
      character.species = species.filter((s): s is Species => s !== null);
    }
    
    // Transform vehicles
    if (swapiCharacter.vehicles && swapiCharacter.vehicles.length > 0) {
      const vehiclesPromises = swapiCharacter.vehicles.map(
        async (vehiclesUrl) => {
          try {
            const vehiclesId = swapiClient.extractIdFromUrl(vehiclesUrl);
            if (vehiclesId) {
              const swapiVehicles = await swapiClient.getVehicleById(
                vehiclesId
              );
              return this.transformVehicles(swapiVehicles);
            }
          } catch (error) {
            console.warn(`Failed to fetch species ${vehiclesUrl}:`, error);
          }
          return null;
        }
      );

      const vehicles = await Promise.all(vehiclesPromises);
      character.vehicles = vehicles.filter((s): s is Vehicles => s !== null);
    }

    // Transform starships
    if (swapiCharacter.starships && swapiCharacter.starships.length > 0) {
      const starshipPromises = swapiCharacter.starships.map(async (starshipUrl) => {
        try {
          const starshipId = swapiClient.extractIdFromUrl(starshipUrl);
          if (starshipId) {
            const swapiStarship = await swapiClient.getStarshipById(starshipId);
            return this.transformStarship(swapiStarship);
          }
        } catch (error) {
          console.warn(`Failed to fetch starship ${starshipUrl}:`, error);
        }
        return null;
      });

      const starships = await Promise.all(starshipPromises);
      character.starships = starships.filter((s): s is Starship => s !== null);
    }

    return character;
  }

  // Transform SWAPI planet to our Planet format
  static transformPlanet(swapiPlanet: SwapiPlanet): Planet {
    return {
      id: swapiPlanet.uid,
      name: swapiPlanet.name,
      climate: swapiPlanet.climate,
      terrain: swapiPlanet.terrain,
      population: swapiPlanet.population,
      diameter: swapiPlanet.diameter,
      gravity: swapiPlanet.gravity,
    };
  }

  // Transform SWAPI film to our Film format
  static transformFilm(swapiFilm: SwapiFilm): Film {
    return {
      id: swapiFilm.uid,
      title: swapiFilm.title,
      episode_id: swapiFilm.episode_id,
      director: swapiFilm.director,
      producer: swapiFilm.producer,
      release_date: swapiFilm.release_date,
    };
  }

  // Transform SWAPI species to our Species format
  static transformSpecies(swapiSpecies: SwapiSpecies): Species {
    return {
      id: swapiSpecies.uid,
      name: swapiSpecies.name,
      classification: swapiSpecies.classification,
      designation: swapiSpecies.designation,
      average_height: swapiSpecies.average_height,
      language: swapiSpecies.language,
      homeworld: swapiSpecies.homeworld,
    };
  }

  // Transform SWAPI species to our Species format
  static transformVehicles(swapiVehicles: SwapiVehicle): Vehicles {
    return {
      id: swapiVehicles.uid,
      name: swapiVehicles.name,
      cargo_capacity: swapiVehicles.cargo_capacity,
      passengers: swapiVehicles.passengers,
      max_atmosphering_speed: swapiVehicles.max_atmosphering_speed,
      crew: swapiVehicles.crew,
      length: swapiVehicles.length,
      model: swapiVehicles.model,
    };
  }

  // Transform SWAPI starship to our Starship format
  static transformStarship(swapiStarship: SwapiStarship): Starship {
    return {
      id: swapiStarship.uid,
      name: swapiStarship.name,
      consumables: swapiStarship.consumables,
      cargo_capacity: swapiStarship.cargo_capacity,
      passengers: swapiStarship.passengers,
      max_atmosphering_speed: swapiStarship.max_atmosphering_speed,
      crew: swapiStarship.crew,
      length: swapiStarship.length,
      model: swapiStarship.model,
      cost_in_credits: swapiStarship.cost_in_credits,
      manufacturer: swapiStarship.manufacturer,
      starship_class: swapiStarship.starship_class,
      hyperdrive_rating: swapiStarship.hyperdrive_rating,
      MGLT: swapiStarship.MGLT,
    };
  }
}
