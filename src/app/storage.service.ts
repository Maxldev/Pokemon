import { Pokemon } from './models/pokemon';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public async getTeam() {
    let team: Pokemon[] = [];
    await this._storage?.forEach((value) => {
      team.push(value as unknown as Pokemon);
    });
    console.log(team);
    return team;
  }

  public getTeamSize() {
    const teamSize = this._storage?.length;
    return teamSize;
  }
  
  public addPokemon(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async getPokemon(key: string, value: any) {
    let pokemon = await this._storage?.get(key);
    return pokemon;
  }

  public delete(key: string) {
    this._storage?.remove(key);
  }

  public deleteTeam() {
    this._storage.clear();
  }
}