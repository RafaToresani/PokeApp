import { Component } from '@angular/core';
import { MostrarComponent } from '../../components/mostrar/mostrar.component';

@Component({
  selector: 'app-pokemon-page',
  standalone: true,
  imports: [MostrarComponent],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css'
})
export class PokemonPageComponent {

}
