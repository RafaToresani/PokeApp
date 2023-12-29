import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environments } from '../../../environments/environments';
import { INavegacionPokemon, IPokemon } from '../interfaces/interfaces';
import { Observable, of, tap } from 'rxjs';
import { IEspecie } from '../interfaces/pkEspecieInterface';
import { IEvolutionChain } from '../interfaces/pkEvolutionInterface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl:string = environments.baseUrl;
  
  

  constructor(private http: HttpClient, private route: Router) {

  }

  //Busca y retorna un pokemon específico.
  getPokemon(value:string): Observable<IPokemon | any>{
    return this.http.get(`${this.baseUrl}pokemon/${value}`)
  }

  //Busca y retorna una lista de pokemons.
  getListaPokemon(page: number = 1, pageSize: number = 10): Observable<INavegacionPokemon[] | any> {

    const key = `${page}-${pageSize}`;
    const cacheData = localStorage.getItem(key);

    //Si existe cache data retorna lo que está guardado en localstorage.
    if(cacheData){
      return of(JSON.parse(cacheData));
    }

    //si no existe cache data entonces realiza la petición y guarda los datos.
    const params = new HttpParams()
      .set('offset', ((page - 1) * pageSize).toString()) // Calcular el offset basado en la página y el tamaño de la página
      .set('limit', pageSize.toString());

    return this.http.get(`${this.baseUrl}pokemon/`, { params })
      .pipe(
        tap((data)=>{
          localStorage.setItem(key, JSON.stringify(data));
        })
      )
  }


  getPokemonSpecie(url:string): Observable<IEspecie | any>{
    return this.http.get(url);
  }

  getPokemonEvolutionChain(url:string): Observable<IEvolutionChain | any>{
    return this.http.get(url);
  }
  
}
