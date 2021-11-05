import { Component, OnInit } from '@angular/core';
import { PagerserviceService } from 'src/app/services/pagerservice.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Licenciaturas } from '../../interfaces/licenciaturas.interface';
import { Router } from '@angular/router';
import * as introJs from 'intro.js';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
    `
 

  .Noticias-item .product-item-content {
       
        margin: .3rem;
        text-align: center;
        padding: 2rem 0;
    }

    .Noticias-item .product-image {
        width: 100%;
        height:100%;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
    }

#dashboar h2, #US h2, #carousel h2, #carreras h2{
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

    #carreras{
      margin-bottom:30px;
    }
  
  `
  ]
})
export class IndexComponent implements OnInit {

  noticias:string[]=["1.jpg","2.jpg","3.png","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"];
 
  usuario: Usuario | undefined;
  
  lics!: Licenciaturas[];

  historial:any="";

  constructor(private pageservice: PagerserviceService,
              private router:Router) { }
  
  ngOnInit(): void {
    
    //Se checa el local storage para ver si el usuario ya esta loggeado, en el else es sino esta en el localstorage se esta observando el servicio para ver si detecto un cambio de 
    //del behavior
    if(localStorage.getItem('user') ){
      let aux=localStorage.getItem('user');
      this.usuario= JSON.parse(aux!);

      if(localStorage.getItem('historial')){
        let aux=localStorage.getItem('historial');
        this.historial=JSON.parse(aux!); 
      }

    }

    else{
      this.pageservice.aux_login.subscribe(user => this.usuario=user);
      
      this.pageservice.aux_historial.subscribe(hist => {
        this.historial=hist
      });
      
    }
    
  this.pageservice.get_Lics()
  .subscribe(resp => this.lics=resp);

  
    this.pageservice.aux_onboarding_index.subscribe(resp  => {
      if(resp){
        setTimeout(() => {
          introJs().setOptions({
            nextLabel: 'Siguente',
            prevLabel: 'Anterior',
            doneLabel: 'Siguiente tutorial',
                steps: [
                  { 
                    element: document.querySelector('div#carousel p-carousel')!,
                    intro: "Aquí se encuentran las últimas noticias sobre la facultad.",
                    position:"top",
                    title:"Inicio"
                  },
                  {
                    element: document.querySelector('#US')!,
                    intro: "Aquí se encuentra la sección sobre la hisotria de la facultad.",
                    position:"right",
                    title:"Inicio"
                  }
                  ,
                  {
                    element: document.querySelector('#carreras')!,
                    intro: "Aquí se encuentran las vistas previas de las licenciaturas.",
                    position:"right",
                    title:"Inicio"
                  }
                ]
              }).start().onexit(()=>{  
                this.pageservice.aux_onboarding_index.next(false);
                this.pageservice.aux_onboarding_licenciaturas.next(true);
                this.router.navigate(['licenciaturas'])
                });
        }, 250);
      
      }
    });

  }

}
