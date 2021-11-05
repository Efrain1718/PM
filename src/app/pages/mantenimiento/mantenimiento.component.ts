import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styles: [
    `
        h2{
    font-family:Roboto;
    font-size: 45px;
    color: #495057;
    text-align: center;

    padding-top: 30px;
    padding-left: 20px;
    padding-bottom: 10px;

   background-color: #d8e0de;
    }
    
    `
  ]
})
export class MantenimientoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
