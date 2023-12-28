import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { IPokemon } from '../../interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent {

  formulario:FormGroup = this.fb.group({
    pokemon: ['', [Validators.required]]
  })

  constructor(private fb:FormBuilder, private router:Router){

  }

  buscarPokemon(){
    if(this.formulario.invalid) return

    const valor=this.formulario.controls['pokemon'].value;
    this.router.navigate([`/pokemon/${valor.toLowerCase()}`]);
  }


}
