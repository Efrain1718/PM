import { Component, ElementRef, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { PagerserviceService } from '../../services/pagerservice.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { DomSanitizer } from '@angular/platform-browser';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { validarQueSeanIguales } from '../contrasenas.validator';

import * as introJs from 'intro.js';
import { Router } from '@angular/router';
import { Historial } from '../../interfaces/Historial.interface';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    #imagenes h2{
    font-family:Roboto;
    font-size: 30px;
    color: #495057;
    text-align: start;

    padding-top: 30px;
    padding-left: 20px;
    padding-bottom: 5px;
    z-index:2;

    border-bottom: 1px solid #d8e0de;
    }
    


    `
  ],
  providers: [ConfirmationService,MessageService]
})
export class MenuComponent implements OnInit {
  usuario: Usuario | undefined;
  info_usuario:Usuario={
    nombre:         "",
    apellido_P:     "",
    apellido_M:     "",
    email:          "",
    foto:           "",
    pass:           ""
  }

  registro_Form = new FormGroup({
    nombre: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]),
    apellido_P: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]),
    apellido_M: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]),
    email: new FormControl('',[Validators.required, Validators.email]),
    foto: new FormControl('',Validators.required),
    pass: new FormControl('',Validators.required),
    confirmpass: new FormControl('',Validators.required),
  },
  {
    validators: validarQueSeanIguales
  });

  login_Form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    pass: new FormControl('',Validators.required)
  });


  items!:MenuItem[];

  preview_img:any;
  ver_login: boolean = false;
  ver_registro: boolean = false;
  ver_informacion: boolean = false;
  confirm_pass:string='';

  aux_hist:Historial={
    licenciatura: "",
    fecha:        ""
  }
  position_dialog:string="";
  get get_user(){
    return {... this.usuario!}
  }

  constructor(private primengConfig: PrimeNGConfig,
              private pageservice: PagerserviceService,
              private router:Router,
              private sanitizer: DomSanitizer,
              private confirmationService: ConfirmationService, 
              private messageService: MessageService) { 

              }
              

  ngOnInit(): void {

    if(localStorage.getItem('user')){
      let aux=localStorage.getItem('user');
      this.usuario= JSON.parse(aux!);
    }
    else{
      this.pageservice.aux_login.subscribe(user => this.usuario=user);
    }
      this.items =[
        {
          label: "Inicio",
        icon: "pi pi-home",
        routerLink: ['/index']
      },
      {
        label: "Facultad",
        routerLink: ['/facultad']
      },
      {
        label: "Alumnos",
        routerLink: ['/alumnos']
      },
      {
        label: "Maestros",
        routerLink: ['/maestros']
      },
      {
        label: "Licenciaturas",
        routerLink: ['/licenciaturas']

      },
      {
        label: "Posgrados",
        routerLink: ['/posgrados']
      },
      
    
    ];

    this.primengConfig.ripple = true;

if(!localStorage.getItem('visited')){
   this.pageservice.aux_onboarding_menu.subscribe(resp => {
    if(resp){
      setTimeout(() => {
        introJs().setOptions({
          nextLabel: 'Siguente',
          prevLabel: 'Anterior',
          doneLabel: 'Siguiente tutorial',
          steps: [
            { 
              intro: "??Hola!, bienvenido/a a la p??gina oficial de la Facultad de Ciencias F??sico Matem??ticas",
              title:"Bienvenido/a"
            },
            {
              element: document.querySelector('.menu-ob')!,
              intro: "Aqu?? se encuentra nuestro men?? donde podr??s interactuar con la p??gina como: navegar, iniciar sesi??n, registrarse, etc.",
              title:"Men?? "
            }
          ]
        }).start().onexit(()=>{ 
          this.pageservice.aux_onboarding_menu.next(false); 
          this.pageservice.aux_onboarding_index.next(true);    
          });
      }, 1000);
    }
  });   
}
 

  
  }

  trust_url(){
    if(this.info_usuario.url_foto){
      let url="https://pm2021.azurewebsites.net/img/"+this.info_usuario.url_foto;
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }
    else{
      return
    }
   
  }
  Ver_login(){
  this.ver_login=true;
  }

  Ver_registro(){
    this.ver_registro=true;
    }

  Ver_informacion(){
    this.ver_informacion=true;
    this.info_usuario= this.get_user;
  }

  login(){
    let aux =this.login_Form.value
  if(aux.email && aux.pass){
    this.pageservice.login(aux.email,aux.pass)
      .subscribe(resp => {
        this.preview_img=undefined;
        this.ver_login=false
        this.pageservice.obtener_historial(resp.id!);
      },
      e=>{
        this.messageService.add({severity:'error', summary:'Error', detail:'El correo y/o la contrase??a son incorrectos'});
      }
      );
  }
  else{
    this.messageService.add({severity:'error', summary:'Error', detail:'Compruebe que todos los campos esten llenos'});
  }
  
  }

  logout(){
   

    if(localStorage.getItem('historial')){
      let aux=localStorage.getItem('historial');
      let historial=JSON.parse(aux!);

        let licenciaturas_hist:string []=[];
        let fecha_visita_hist:string []=[];

        for(let i = 0; i < historial.length; i++) {
          let lic;
          let fecha;
          lic=historial[i].licenciatura
          licenciaturas_hist.unshift(lic);

          fecha=historial[i].fecha
          fecha_visita_hist.unshift(fecha);
      }

      if(licenciaturas_hist.length == fecha_visita_hist.length)
       
        for (let i = 0; i < licenciaturas_hist.length; i++) {
     
          this.aux_hist.licenciatura=licenciaturas_hist[i];
          this.aux_hist.fecha=fecha_visita_hist[i];
          this.aux_hist.id=this.usuario?.id;
          this.pageservice.guardar_historial(this.aux_hist)
          .subscribe(resp =>{
            this.pageservice.aux_login.next(undefined);
            this.pageservice.aux_historial.next(undefined);
            localStorage.removeItem('user');
            localStorage.removeItem('historial');
    
              window.location.href="https://efrain1718.github.io/PM/index"
              // window.location.href="http://localhost:4200/index"


          })
        }

    }
    else{
      this.pageservice.aux_login.next(undefined);
      this.pageservice.aux_historial.next(undefined);
      localStorage.removeItem('user');
      
      setTimeout(() => {
      window.location.href="https://efrain1718.github.io/PM/index"
      // window.location.href="http://localhost:4200/index"
        }, 100);
      
    }
     
  
  
  }

  crear_usuario(){
    let auxform={... this.registro_Form.value}
    auxform.foto=this.info_usuario.foto;
    this.info_usuario=auxform;
  
    if(this.info_usuario.pass!=auxform.confirmpass){
     this.messageService.add({severity:'error', summary:'Error', detail:'Las contrase??as no coinciden'});
     return
    }
    else{
        if(this.info_usuario.nombre && this.info_usuario.apellido_P && this.info_usuario.apellido_M && this.info_usuario.email && this.info_usuario.foto && this.info_usuario.pass){

          let dataform = new FormData();
          dataform.append("nombre",this.info_usuario.nombre);
          dataform.append("apellido_P",this.info_usuario.apellido_P);
          dataform.append("apellido_M",this.info_usuario.apellido_M);
          dataform.append("email",this.info_usuario.email);
          dataform.append("pass",this.info_usuario.pass);
          dataform.append("foto",this.info_usuario.foto);

          this.pageservice.crear_usuario(dataform)
          .subscribe(resp =>{
            this.ver_registro=false;
            this.messageService.add({severity:'success', summary:'Registro exitoso!', detail:'Se ha creado exitosamente el usuario'});
            this.preview_img=undefined;
            this.registro_Form.reset()
          },
          e=>{
            this.messageService.add({severity:'error', summary:'Error', detail:'Error al crear usuario, vuelva a intentarlo'});
          }
          );

      }else{
        this.messageService.add({severity:'error', summary:'Error', detail:'Compruebe que todos los campos esten llenos y que el correo no exista en otra cuenta'});
      }
 
    }

  }

modificar_usuario(){
   
  if(this.info_usuario){

    if(JSON.stringify(this.info_usuario)== JSON.stringify(this.usuario)){
      this.messageService.add({severity:'error', summary:'Error', detail:'Error al actualizar la informaci??n, favor de checar que si tenga la informaci??n modificada'});
    }
    else{

    
        let mod={...this.info_usuario};

        if(this.info_usuario.id == this.usuario!.id)
        {
          mod.id=this.info_usuario.id!;
          
          if(this.info_usuario.nombre !=this.usuario!.nombre){
            mod.nombre=this.info_usuario.nombre;
          }
          if(this.info_usuario.apellido_P !=this.usuario!.apellido_P){
            mod.apellido_P=this.info_usuario.apellido_P;
          }
          if(this.info_usuario.apellido_M !=this.usuario!.apellido_M){
            mod.apellido_M=this.info_usuario.apellido_M;
          }
          if(this.info_usuario.email !=this.usuario!.email){
              mod.email=this.info_usuario.email;
          }
          if(this.info_usuario.pass != this.usuario!.pass){
            if(this.info_usuario.pass==this.confirm_pass ){
              mod.pass=this.info_usuario.pass;
              console.log("contrase??a confirmada")
            }
            else{
              this.messageService.add({severity:'error', summary:'Error', detail:'Para cambiar la contrase??a se necesita confirmar'});
              return
            }   
          }
          if(this.info_usuario.foto !=this.usuario!.foto){
            mod.foto=this.info_usuario.foto;
          }
          if(this.confirm_pass && this.confirm_pass!=this.info_usuario.pass)
          {
            this.messageService.add({severity:'error', summary:'Error', detail:'Si no va a cambiar la contrase??a, por favor borrar la informaci??n del campo "confirmar contrase??a"'});
            return;
          }
        }
  
          let dataform = new FormData();
          dataform.append("id",mod.id!);
          dataform.append("nombre",mod.nombre);
          dataform.append("apellido_P",mod.apellido_P);
          dataform.append("apellido_M",mod.apellido_M);
          dataform.append("email",mod.email);
          dataform.append("pass",mod.pass);
          dataform.append("foto",mod.foto);
          dataform.append("url_old",mod.url_foto!);
     
          this.pageservice.actualizar_usuario(dataform)
          .subscribe(resp => {
            if(resp =="1"){
              localStorage.removeItem('user');
  
              this.pageservice.login(mod.email,mod.pass)
              .subscribe(resp =>{
                this.usuario=resp;
              });
              this.messageService.add({severity:'success', summary:'Actualizaci??n exitosa!', detail:'Se ha actualizado correctamente el usuario'});
              setTimeout( () =>{
                this.ver_informacion=false;
                this.preview_img=undefined;
              },500 ); 
            
            }
          },e => {
            console.log(e);
            this.messageService.add({severity:'error', summary:'Error', detail:'Suced??o un problema al momento de actualizar, intente de nuevo'});
          });    
                  
    }
  }
}

get_Img(fileinput:Event){
    let file= (<HTMLInputElement>fileinput.target).files![0];
    
    if(file==undefined){
      this.info_usuario.foto=null;
      console.log( this.info_usuario.foto);
      this.preview_img=undefined;
    }
    if(file.type == "image/jpeg" || file.type == "image/png" ){
      this.info_usuario.foto=file;
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (event) => { 
        this.preview_img = event.target!.result;
      }
    }
    else{
      
      console.log("esto no es una imagen aceptada");
    }

  }

Dialogo_confirmacion(position: string,opc: string) { //y aqui se elimina
    this.position_dialog = position;

    let message="";
    let header="";
    let icon ="";
    switch(opc) {
      case 'eliminar':
        message='??Quieres eliminar tu cuenta?';
        header= 'Confirmaci??n de eliminaci??n de cuenta';
        icon= 'pi pi-info-circle'
      break;
      case 'actualizar':
        message='??Quieres actualizar tu cuenta?';
        header= 'Confirmaci??n de actualizaci??n de cuenta';
        icon= 'pi pi-info-circle'
      break;
  }

    this.confirmationService.confirm({    
        message: message,
        header: header,
        icon: icon,
        accept: () => {
          if(opc=='eliminar'){
              this.pageservice.eliminar_usuario(this.usuario!)
              .subscribe(resp => {
                this.messageService.add({severity:'success', summary:'Eliminaci??n exitosa!', detail:'Se ha eliminado correctamente el usuario'});
                setTimeout( () =>{this.logout()},300);
              },e =>{
                this.messageService.add({severity:'error', summary:'Error', detail:'Suced??o un problema al momento de eliminar, intente de nuevo'});
              });
              
          }
          else if(opc== 'actualizar'){
         this.modificar_usuario();
          }
        },
        key: "positionDialog"
    });
}

keyaccept(event:KeyboardEvent){
  return (event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || (event.keyCode==32)
}

checarSiSonIguales(): boolean { //<- funcion para formulario

  return this.registro_Form.hasError('noSonIguales') &&
    this.registro_Form.get('pass')!.dirty &&
    this.registro_Form.get('confirmpass')!.dirty;
}

confirmar_contra(){
  if(this.confirm_pass){
    return this.info_usuario.pass===this.confirm_pass ? true:false
  }
  else
  return true;
 
}
}
