import { DamageRelations, IType } from './../../interfaces/pkTypeInterface';
import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { IPokemon } from '../../interfaces/interfaces';
import { ActivatedRoute,} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TypeService } from '../../services/type.service';


@Component({
  selector: 'app-mostrar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar.component.html',
  styleUrl: './mostrar.component.css'
})
export class MostrarComponent {

  pokemon:IPokemon | any;
  types:IType [] | any = [];
  isToggleActive:boolean = true;
  weakness = new Map<string, number>();
  endurance= new Map<string, number>();
  inmunity = new Map<string, number>();

  constructor(private pokemonService: PokemonService, private route:ActivatedRoute, private typeService:TypeService){

  }
  ngOnInit():void{
    this.route.params.subscribe((params) => {
      const pokemonId = params['id'];
      this.pokemonService.getPokemon(pokemonId).subscribe(
        {
          next: (pokemon) => {
            this.pokemon=pokemon;
            this.loadTypes();
          },
          error: (err) => {
            alert('El pokemon buscado no existe.')
          }
        }
      )
    });
  }

  toggleClass(){
    this.isToggleActive = !this.isToggleActive;
  }

  loadTypes() {
    const typePromises = this.pokemon.types.map((element: { type: { url: any; }; }) => {
      return new Promise<void>((resolve, reject) => {
        this.typeService.getType(element.type.url).subscribe(
          {
            next: (response) => {
              this.types.push(response);
              resolve(); 
            },
            error: (err) => {
              console.log(err);
              reject(err); 
            }
          }
        );
      });
    });
  

    Promise.all(typePromises).then(() => {
      this.chargeDamageRelations(); 
    });
  }

  chargeDamageRelations() {
    this.types.forEach((type:IType) => {
      type.damage_relations.double_damage_from.forEach(element => {
        
        if (this.weakness.has(element.name)) {
          this.weakness.set(element.name, 4);
        }else{
          this.weakness.set(element.name, 2);
        }

      });

      type.damage_relations.half_damage_from.forEach(element => {
        if(this.weakness.has(element.name)){
          this.weakness.delete(element.name);
        }else{
          if(this.endurance.has(element.name)){
            this.endurance.set(element.name, 1/4)
          }else {
            this.endurance.set(element.name, 1/2);
          }
        }
      })

      type.damage_relations.no_damage_from.forEach(element => {
        if(this.weakness.has(element.name)) this.weakness.delete(element.name);
        if(this.endurance.has(element.name)) this.endurance.delete(element.name);
        this.inmunity.set(element.name, 0);
        
      })
    });
  }
  
}
