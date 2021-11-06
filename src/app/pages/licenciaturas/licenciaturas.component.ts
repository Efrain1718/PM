import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Licenciaturas } from 'src/app/interfaces/licenciaturas.interface';
import { PagerserviceService } from 'src/app/services/pagerservice.service';

import * as introJs from 'intro.js';
@Component({
  selector: 'app-licenciaturas',
  templateUrl: './licenciaturas.component.html',
  styles: [
    `
     h2{
    font-family:Roboto;
    font-size: 30px;
    color: #495057;
    text-align: start;

    padding-top: 30px;
    padding-left: 20px;
    padding-bottom: 10px;
    margin-bottom:20px;

   background-color: #d8e0de;
    }
    
    `
  ]
})
export class LicenciaturasComponent implements OnInit {

    
  lics!: Licenciaturas[];

  constructor(private pageservice: PagerserviceService,
              private router: Router) { }

  ngOnInit(): void {

    this.pageservice.get_Lics()
    .subscribe(resp => this.lics=resp);

    this.pageservice.aux_onboarding_licenciaturas.subscribe(resp  => {
      if(resp){
        
        setTimeout(() => {
          introJs().setOptions({
            doneLabel: 'Siguiente tutorial',
            steps: [
              { 
                element:'#licenciaturas',
                intro: "Aquí se encuentran todas las licenciaturas con vista previa de su imagen y objetivo.",
                title:"Licenciaturas"
              }
            ]
          }).start().onexit(()=>{  
            this.pageservice.aux_onboarding_licenciaturas.next(false);
            this.pageservice.aux_onboarding_lic.next(true);
            this.router.navigate(["/licenciaturas",1])
            });
        }, 1000);
      
      }
    });
  }

  In_lic(id:string){
    this.router.navigate(["/licenciaturas",id])
  }
}
