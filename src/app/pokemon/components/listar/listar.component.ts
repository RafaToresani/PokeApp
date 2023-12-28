import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Router } from '@angular/router';
import { INavegacionPokemon, IPokemon } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent {

  listaNavegacion: INavegacionPokemon[] | any = [];
  listaPokemons: IPokemon[]=[];

  numeroPagina: number = 1;
  cantidadPagina: number = 12;

  constructor(private pokemonService: PokemonService, private router: Router){

  }


  ngOnInit():void{
    this.mostrarPagina(this.numeroPagina);
  }

  mostrarPagina(page: number){
    this.pokemonService.getListaPokemon(page, this.cantidadPagina)
      .subscribe(
        {
          next: (pokemons) => {
            this.listaNavegacion = pokemons.results;
            console.log(this.listaNavegacion);
            this.cargarListaPokemons();
          },
          error: (err) => {
            console.log(err);
          }
        }
      )
  }

  cargarMas(){
    this.numeroPagina++;
    this.mostrarPagina(this.numeroPagina);
  }


  redirectToPokemon(value: string){
    this.router.navigate([`/pokemon/${value}`]);
  }

  cargarListaPokemons(){
    if(Array.isArray(this.listaNavegacion)){
      this.listaNavegacion.forEach( (pokemon) => {
        this.pokemonService.getPokemon(pokemon.name).subscribe({
          next: (pokemon) => {
            this.listaPokemons.push(pokemon);
            console.log(pokemon);
          },
          error: (err) => {
            alert(err);
          }
        })
      } )
    }
  }

/*funcion(pokemonId:string){
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
  }*/
}
