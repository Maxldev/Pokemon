import { Pokemon } from './../models/pokemon';
import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  pokemons = [];
  selectedPokemon: Pokemon;
  shiny = false;

  constructor(private pokeapi : PokeapiService) { }

  ngOnInit() {
    this.getPokemons();
  }

  public async getPokemons() {
    this.pokemons = await this.pokeapi.getPokemons();
  }
  
  public async getPokemon(id:number) {
    this.shiny = false;
    if (!this.selectedPokemon || id !== this.selectedPokemon.id) {
      this.selectedPokemon = await this.pokeapi.getPokemon(id);
    } else {
      this.selectedPokemon = null;
    }
  }

  public switchShiny() {
    this.shiny = !this.shiny;
  }
}
