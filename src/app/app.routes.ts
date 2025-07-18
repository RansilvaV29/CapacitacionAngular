import { Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { EditarComponent } from './editar/editar.component';
import { CrearComponent } from './crear/crear.component';

export const routes: Routes = [
    {path: '', redirectTo: 'lista', pathMatch: 'full'},
    {path: 'lista', component: ListaComponent},
    {path: 'crear', component: CrearComponent},
    {path: 'editar/:id', component: EditarComponent}
];
