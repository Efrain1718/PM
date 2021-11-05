import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//angular flex
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';





@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    PrimeNgModule,
    ReactiveFormsModule

  ],
  exports: [
    MenuComponent,
    FooterComponent
  ]
})
export class ComponentesModule { }
