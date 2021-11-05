import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LicenciaturaComponent } from './pages/licenciatura/licenciatura.component';
import { LicenciaturasComponent } from './pages/licenciaturas/licenciaturas.component';
import { MantenimientoComponent } from './pages/mantenimiento/mantenimiento.component';

const routes: Routes = [
  {
    path: 'index',
     component: IndexComponent

  }
  ,
  {
    path: 'facultad',
    component: MantenimientoComponent
  },
  {
    path: 'alumnos',
    component: MantenimientoComponent
  },
  {
    path: 'maestros',
    component: MantenimientoComponent
  },
  {
    path: 'licenciaturas',
    component: LicenciaturasComponent
  },
  {
    path: 'licenciaturas/:id',
    component: LicenciaturaComponent
  },
  {
    path: 'posgrados',
    component: MantenimientoComponent
  },
  {
    path: '**',
    // component: ErrorPageComponent
    redirectTo: 'index'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
