import { Pokemon } from './models/pokemon';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  constructor(private http: HttpClient) { }

  public getPokemons(): Promise<Array<Pokemon>> {
    return new Promise(async (resolve, reject) => {
      try 
      {
        const response = await this.http.get('https://pokeapi.co/api/v2/pokemon-species?&limit=2000').toPromise();
        if (response && response['results']) {
          const pokemons = [];
          response['results'].forEach(element => {
            let id = element['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '').slice(0, -1) as number;
            let pokemon = new Pokemon(id, element['name']);
            pokemons.push(pokemon);
          });
          resolve(pokemons);
        } else {
          reject('Impossible de récupérer la liste des pokémons depuis l\'api');
        }
      } 
      catch (error) {
        console.log(error);
      }
    });
  }

  public getPokemon(id:number): Promise<Pokemon> {
    return new Promise(async (resolve, reject) => {
      try 
      {
        const responsePokemon = await this.http.get('https://pokeapi.co/api/v2/pokemon/' + id).toPromise();
        const responseSpecies = await this.http.get('https://pokeapi.co/api/v2/pokemon-species/' + id).toPromise();
        if (responsePokemon && responseSpecies) {
          const types = [];
          responsePokemon['types'].forEach(element => {
            types.push(element['type']['name']);
          });
          let pokemon = new Pokemon(
            id, 
            responseSpecies['name'], 
            responseSpecies['names'][4]['name'],
            responseSpecies['color']['name'],
            responsePokemon['sprites']['other']['official-artwork']['front_default'],
            responsePokemon['sprites']['front_shiny'],
            responsePokemon['height'] / 10,
            responsePokemon['weight'] / 10,
            types,
            responsePokemon['stats'][0]['base_stat'],
            responsePokemon['stats'][1]['base_stat'],
            responsePokemon['stats'][2]['base_stat'],
            responsePokemon['stats'][3]['base_stat'],
            responsePokemon['stats'][4]['base_stat'],
            responsePokemon['stats'][5]['base_stat'],
            );
          resolve(pokemon);
        } else {
          reject('Impossible de récupérer le pokémon depuis l\'api');
        }
      } 
      catch (error) {
        console.log(error);
      }
    });
  }
}
