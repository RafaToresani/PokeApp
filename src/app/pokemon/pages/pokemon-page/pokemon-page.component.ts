import { BuscarComponent } from './../../components/buscar/buscar.component';
import { Component } from '@angular/core';
import { MostrarComponent } from '../../components/mostrar/mostrar.component';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [MostrarComponent, BuscarComponent],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css'
})
export class PokemonPageComponent {

}
