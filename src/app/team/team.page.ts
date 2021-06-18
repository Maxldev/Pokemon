import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage implements OnInit {
  team: Pokemon[] = [];

  constructor(private storage : StorageService) {}

   ngOnInit() {}

   ionViewDidEnter() {
     this.getTeam();
   }

   public getTeam() {
    this.storage.getTeam().then(result => {
        this.team = result;
      }); 
    console.log(this.team);
   }

   public deleteTeam() {
     this.storage.deleteTeam();
     this.getTeam();
   }

   public delete(key: string) {
      this.storage.delete(key);
      this.getTeam();
    }

}
