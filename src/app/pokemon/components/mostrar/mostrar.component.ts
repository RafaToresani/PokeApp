import { Species } from './../../interfaces/interfaces';
import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { IPokemon } from '../../interfaces/interfaces';
import { ActivatedRoute,} from '@angular/router';
import { CommonModule } from '@angular/common';
import { IEspecie } from '../../interfaces/pkEspecieInterface';
import { IEvolutionChain } from '../../interfaces/pkEvolutionInterface';

@Component({
  selector: 'app-mostrar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar.component.html',
  styleUrl: './mostrar.component.css'
})
export class MostrarComponent {

  pokemon:IPokemon | any;
  especie:IEspecie | any;
  evolucion:IEvolutionChain | any;
  isToggleActive:boolean = true;

  constructor(private pokemonService: PokemonService, private route:ActivatedRoute){

  }
  ngOnInit():void{
    this.route.params.subscribe((params) => {
      const pokemonId = params['id'];
      console.log('Parámetro recibido:', pokemonId);
      this.pokemonService.getPokemon(pokemonId).subscribe(
        {
          next: (pokemon) => {
            console.log(pokemon);
            this.pokemon=pokemon;
            this.cargarEspecie();
          },
          error: (err) => {
            alert('El pokemon buscado no existe.')
          }
        }
      )
    });
  }


  cargarEspecie(){
    this.pokemonService.getPokemonSpecie(this.pokemon.species.url).subscribe(
      {
        next: (specie) => {
          this.especie = specie;
          this.cargarEvolucion();
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  cargarEvolucion(){
    this.pokemonService.getPokemonEvolutionChain(this.especie.evolution_chain.url).subscribe(
      {
        next: (evol) => {
          this.evolucion = evol;
          console.log(this.evolucion);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }

  toggleClass(){
    this.isToggleActive = !this.isToggleActive;
  }

  
}
