import { Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { InformacionComponent } from './components/informacion/informacion.component';

export const routes: Routes = [
    { path: '', redirectTo: '/formulario', pathMatch: 'full' },
    {path: 'formulario', title: 'Formulario', component: FormularioComponent}, 
    {path: 'informacion', title: 'Informacion', component: InformacionComponent}
];
