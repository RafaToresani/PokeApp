import { Component } from '@angular/core';
import { MostrarComponent } from '../../components/mostrar/mostrar.component';
import { BuscarComponent } from '../../components/buscar/buscar.component';
import { ListarComponent } from '../../components/listar/listar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BuscarComponent, ListarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
