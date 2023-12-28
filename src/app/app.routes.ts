import { Routes } from '@angular/router';
import { HomePageComponent } from './pokemon/pages/home-page/home-page.component';
import { PokemonPageComponent } from './pokemon/pages/pokemon-page/pokemon-page.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch:'full'
    },
    {
        path: 'home', component:HomePageComponent
    },
    {
        path: 'pokemon/:id', component:PokemonPageComponent
    }
];
