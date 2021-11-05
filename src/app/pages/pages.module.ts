import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//angular flex
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

//componentes
import { IndexComponent } from './index/index.component';
import { LicenciaturasComponent } from './licenciaturas/licenciaturas.component';
import { LicenciaturaComponent } from './licenciatura/licenciatura.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';




@NgModule({
  declarations: [
    IndexComponent,
    LicenciaturasComponent,
    LicenciaturaComponent,
    MantenimientoComponent,

  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    PrimeNgModule,
  ],

})
export class PagesModule { }
