import { StorageService } from './../storage.service';
import { Pokemon } from './../models/pokemon';
import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../pokeapi.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  pokemons = [];
  selectedPokemon: Pokemon;
  pokemonToAdd: Pokemon;
  shiny = false;
  keys = ['1','2','3','4','5','6'];

  constructor(private pokeapi : PokeapiService, private storage : StorageService, public toastCtrl: ToastController) {}

  ngOnInit() {
    this.getPokemons();
  }

  public async getPokemons() {
    this.pokemons = await this.pokeapi.getPokemons();
  }

  public async addPokemon(id : number) {
    this.pokemonToAdd = await this.pokeapi.getPokemon(id);
    this.storage.addPokemon(this.pokemonToAdd.name, this.pokemonToAdd);
      const toast = await this.toastCtrl.create({
        message : this.pokemonToAdd.french_name + ' a été ajouté à votre équipe',
        duration : 3000
      })
      toast.present();
    this.pokemonToAdd = null;

    
    /* let team = await this.storage.getTeam();
      console.log(team);
    if (team || team.length < 6) {
      const team = this.storage.getTeam();
      console.log(team);
      let availableKeys = this.keys.filter(async x => !(await team).includes(x));
      this.storage.addPokemon(availableKeys[0], pokemon);
      const toast = await this.toastCtrl.create({
        message : pokemon.name + 'a été ajouté à votre équipe',
        duration : 3000
      })
      toast.present();
    } else {
      const toast = await this.toastCtrl.create({
        message : 'Votre équipe contient déjà 6 pokémons, veuillez en enlever un',
        duration : 3000
      })
      toast.present();
    } */
  }
  
  public async getPokemon(id:number) {
    this.shiny = false;
    if (!this.selectedPokemon || id !== this.selectedPokemon.id) {
      this.selectedPokemon = await this.pokeapi.getPokemon(id);
    } else {
      this.selectedPokemon = null;
    }
  }
}
