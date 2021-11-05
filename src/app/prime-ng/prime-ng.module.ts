import { NgModule } from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AccordionModule} from 'primeng/accordion';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CarouselModule} from 'primeng/carousel';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DividerModule} from 'primeng/divider';
import {DialogModule} from 'primeng/dialog';
import {FieldsetModule} from 'primeng/fieldset';
import {ImageModule} from 'primeng/image';
import {InputTextModule} from 'primeng/inputtext';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TimelineModule} from 'primeng/timeline';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {PasswordModule} from 'primeng/password';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
  exports:[
    AccordionModule,
    AvatarModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    BreadcrumbModule,
    CarouselModule,
    CardModule,
    ConfirmDialogModule,
    DividerModule,
    DialogModule,
    FieldsetModule,
    ImageModule,
    InputTextModule,
    MenubarModule,
    MessagesModule,
    MessageModule,
    TimelineModule,
    TableModule,
    ToastModule,
    PasswordModule,
    ProgressSpinnerModule
 
  ]
})
export class PrimeNgModule { }
