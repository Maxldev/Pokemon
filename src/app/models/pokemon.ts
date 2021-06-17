export class Pokemon {
    id: number;
    name: string;
    french_name: string;
    color: string;
    base_experience: number;
    height: number;
    weight: number;
    img: string;
    shinyimg: string;
    types: string[];
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;

    constructor(id: number, name: string, french_name?: string, color?: string, img?: string, shinyimg?: string, height?: 
        number, weight?: number, types?:string[], hp?: number, attack?: number, defense?: number, special_attack?: number, special_defense?: number, speed?: number){
        this.id = id;
        this.name = name;
        if(french_name) {
            this.french_name = french_name;
        }
        if(img) {
            this.img = img;
        }
        if(shinyimg) {
            this.shinyimg = shinyimg;
        }
        if(height) {
            this.height = height;
        }
        if(weight) {
            this.weight = weight;
        }
        if(types) {
            this.types = types;
        }
        if(hp) {
            this.hp = hp;
        }
        if(attack) {
            this.attack = attack;
        }
        if(defense) {
            this.defense = defense;
        }
        if(special_attack) {
            this.special_attack = special_attack;
        }
        if(special_defense) {
            this.special_defense = special_defense;
        }
        if(speed) {
            this.speed = speed;
        }


    }
}
