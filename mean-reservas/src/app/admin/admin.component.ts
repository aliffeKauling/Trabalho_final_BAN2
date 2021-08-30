import { Component, OnInit } from '@angular/core';
import { DormitorioService } from '../shared/services/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  constructor( private dormitorioService:DormitorioService) {}

  dormitorio:any = {status:''};
  dormitorios:any = [];
  public ngOnInit() {
    this.findDormitorios();
  }

  salvarDormitorio(){
    console.log('metodo salvar', this.dormitorio)
    this.dormitorioService.register(this.dormitorio).subscribe(
      res=>{
        console.log(res)
        this.findDormitorios();
      },
      err=>{
        console.log(err)
      }
    )
  }

  findDormitorios(){
    this.dormitorioService.find().subscribe(
      res=>{
        this.dormitorios = res;
      },
      err=>{
        console.log(err)
      }
    )
  }
}


