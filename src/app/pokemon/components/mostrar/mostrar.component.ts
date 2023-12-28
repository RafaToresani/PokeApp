import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { IPokemon } from '../../interfaces/interfaces';
import { ActivatedRoute,} from '@angular/router';

@Component({
  selector: 'app-mostrar',
  standalone: true,
  imports: [],
  templateUrl: './mostrar.component.html',
  styleUrl: './mostrar.component.css'
})
export class MostrarComponent {

  pokemon:IPokemon | any;

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
          },
          error: (err) => {
            alert('El pokemon buscado no existe.')
          }
        }
      )
    });
  }


}
