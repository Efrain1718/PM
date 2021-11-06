import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

import { PagerserviceService } from 'src/app/services/pagerservice.service';
import { Licenciaturas } from '../../interfaces/licenciaturas.interface';
import { Materias } from '../../interfaces/materias.interface';



import * as introJs from 'intro.js';
@Component({
  selector: 'app-licenciatura',
  templateUrl: './licenciatura.component.html',
  styles: [
  `
  h1
  { 
    font-family:Roboto;
    color: #4b4c4c;
    text-align: center;

    padding-top: 30px;
    padding-left: 20px;
    padding-bottom: 10px;
    margin:0px 40px 20px 40px;
    }

    img{
      width:60%;
      height:400px;
      margin-bottom: 20px;

      border-radius:10px
    }


    #info h2,#plan-estudios h2{
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
export class LicenciaturaComponent implements OnInit {

  lic!: Licenciaturas;
  cualidades!:string[];
  trabajos!:string[];

  materias!:Materias[];

  id_lic!:string;
  items!: MenuItem[];

  aux!:any
  constructor(private pageservice: PagerserviceService,
              private activateRoute: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.activateRoute.params
    .subscribe(({id}) => this.id_lic=id);
   
    this.pageservice.get_Lic(this.id_lic)
    .subscribe(rsp =>{
      this.lic=rsp;
      this.cualidades=this.lic.cualidades.split('/');
      this.trabajos=this.lic.trabajos.split('/');
      this.items=[
        {
          icon:'fa fa-regular fa-hand-point-left',
          routerLink: ['/licenciaturas']
        },
        {
          label:this.lic.nombre
    
        }
      ]

    })

    this.pageservice.get_Materias(this.id_lic)
  .subscribe(m => {
    this.materias=m
  });



  this.pageservice.aux_onboarding_lic.subscribe(resp  => {
    if(resp){
     
    setTimeout(() => {
      introJs().setOptions({
        nextLabel: 'Siguente',
        prevLabel: 'Anterior',
        doneLabel: 'Terminar tutorial',
        steps: [
          { 
            element: document.querySelector('div#regresar')!,
            intro: "Aquí se encuentran los botones para regresar a la página de licenciaturas.",
            title:"Licenciatura"
          },
          { 
            element: document.querySelector('#titulo')!,
            intro: "Este es el título de la licenciatura.",
            title:"Licenciatura"
          },
          { 
            element: document.querySelector('#img')!,
            intro: "Esta es la imagen representativa de la licenciatura.",
            title:"Licenciatura"
          },
          { 
            element: document.querySelector('div#info')!,
            intro: "Aquí se encuentra la información de licenciatura como: objetivo de la licenciatura, perfil del egresado, entre otros.",
            title:"Licenciatura"
          },
          { 
            element: document.querySelector('div#plan-estudios')!,
            intro: "Aquí se encuentra el plan de estudios de la licenciatura.",
            title:"Licenciatura"
          },
          { 
            element: document.querySelector('#tabla')!,
            intro: "Esta es una tabla paginada que contiene todas las materias que se imparten en la licenciatura.",
            title:"Licenciatura"
          }
          

        ]
      }).start().onexit(()=>{  
      this.pageservice.aux_onboarding_lic.next(false);
      localStorage.setItem('visited','true')
      this.router.navigate(["/index"])
      });
    }, 250);
 
    }
  });

  }



}
