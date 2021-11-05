import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Usuario } from '../interfaces/usuario.interface';
import { Licenciaturas } from '../interfaces/licenciaturas.interface';
import { BehaviorSubject, Observable } from 'rxjs';

import { tap } from "rxjs/operators";
import { Materias } from '../interfaces/materias.interface';
import { Historial } from '../interfaces/Historial.interface';



@Injectable({
  providedIn: 'root'
})
export class PagerserviceService {

  baseUrl: string = environment.baseUrl;
  usuario: Usuario | undefined=undefined;

  public aux_login: BehaviorSubject<Usuario | undefined >= new BehaviorSubject<Usuario | undefined>(undefined);
  
  aux_historial: BehaviorSubject<string | undefined >= new BehaviorSubject<string | undefined>(undefined);
  constructor(private http : HttpClient) { }

  aux_onboarding_menu: BehaviorSubject<boolean >= new BehaviorSubject<boolean>(true);
  aux_onboarding_index: BehaviorSubject<boolean >= new BehaviorSubject<boolean>(false);
  aux_onboarding_licenciaturas: BehaviorSubject<boolean >= new BehaviorSubject<boolean>(false);
  aux_onboarding_lic: BehaviorSubject<boolean >= new BehaviorSubject<boolean>(false);

  aux_subir_historial:Historial={
    licenciatura: "",
    fecha:        ""
  }
  get_date():string{
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
  return `${date}/${month}/${year}`;
  
  }

  login(email :string, contra:string):Observable<Usuario>{

    const params= new HttpParams()
    .set('email',email)
    .set('pass',contra);

    return this.http.get<Usuario> (`${this.baseUrl}/User/Login`,{params })
    .pipe(
      tap(resp => this.usuario=resp),
      tap(user => localStorage.setItem('user',JSON.stringify(user))),
      tap(user =>this.aux_login.next(user))
    );
  }


  get_Lics():Observable<Licenciaturas[]> {
    return this.http.get<Licenciaturas[]>(`${this.baseUrl}/Licenciaturas`);
  }

  get_Lic(id:string):Observable<Licenciaturas> {
    const params= new HttpParams()
    .set('id',id);

    return this.http.get<Licenciaturas>(`${this.baseUrl}/Licenciaturas/Licenciatura`,{params})
    .pipe(
        tap(lic => {
          if(this.usuario || localStorage.getItem('user')){


            let aux:any={
              "licenciatura": lic.nombre,
              "fecha": this.get_date()
            }

            if(!localStorage.getItem('historial')){
              let aux_pass:any[]=[];
              
              aux_pass.push(aux);
              localStorage.setItem('historial',JSON.stringify(aux_pass));
              this.aux_historial.next(JSON.stringify(aux_pass))

            }
        else{
            
              let aux_get=JSON.parse(localStorage.getItem('historial')!);
              let day=this.get_date();
              let flag=false;
          
              for (let i = 0; i < aux_get.length; i++) {
                
                if(aux_get[i].licenciatura == lic.nombre && aux_get[i].fecha == day ){
                  flag=true;
                break;
                }
              }

              if(flag==true){
                localStorage.setItem('historial',JSON.stringify(aux_get));
              }
              else{
                aux_get.unshift(aux);
                if(aux_get.length >4){
                  aux_get.splice(4,aux_get.length-4);
                }
                localStorage.setItem('historial',JSON.stringify(aux_get));
                this.aux_historial.next(JSON.stringify(aux_get))
              }   
         }


          }
        })
    )
  }

  get_Materias(id:string):Observable<Materias[]> {
    const params= new HttpParams()
    .set('id',id);
    return this.http.get<Materias[]>(`${this.baseUrl}/Licenciaturas/Materias`,{params });
  }

  crear_usuario(usuario:FormData): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.baseUrl}/User/Crear`,usuario);
  }

  actualizar_usuario(usuario:FormData): Observable<string>{
    return this.http.put<string>(`${this.baseUrl}/User/Actualizar`,usuario);
  }

  eliminar_usuario(usuario: Usuario): Observable<Usuario>{

    const params= new HttpParams()
    .set('id',usuario.id!)
    .set('url_foto',usuario.url_foto!);

   return this.http.delete<Usuario>(`${this.baseUrl}/User/Eliminar`,{params});
  }


  guardar_historial(historial:Historial): Observable<string>{
    return this.http.post<string>(`${this.baseUrl}/User/GH`,historial);
  }

  obtener_historial(id:string){
    const params= new HttpParams()
    .set('id',id)
    this.http.get<Historial[]> (`${this.baseUrl}/User/OH`,{params})
    .subscribe(resp =>{
      let array=[]
      for (let i = 0; i < resp.length; i++) {
        this.aux_subir_historial.licenciatura= resp[i].licenciatura;
        this.aux_subir_historial.fecha= resp[i].fecha;
        array.push(JSON.parse(JSON.stringify(this.aux_subir_historial)));

      }
      if(!localStorage.getItem('historial')){
       localStorage.setItem('historial',JSON.stringify(array));
       this.aux_historial.next(JSON.parse(JSON.stringify(array)));
      }
    });
  }
}

