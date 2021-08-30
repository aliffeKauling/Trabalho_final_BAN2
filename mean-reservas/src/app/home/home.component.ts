import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '@app/shared/interfaces';
import { AuthService, DormitorioService, ReservaService, UserService } from '../shared/services';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private reservaService: ReservaService,
    private dormitorioService:DormitorioService,
    private userService:UserService,
    private authService:AuthService) { }

  reservas:any = [];
  reserva:any = {checkin:{}, checkout:{}, consumo:[], acompanhantes:[]};
  hospedes:any = [];
  acompanhantes:any = [];
  hospedeSelecionado:any = {};
  acompanhantesSelecionados:any = [];
  consumo:any = {};
  freegobar:any = [];
  dormitorios:any = [];
  
  myControl = new FormControl();
  filteredOptions!: Observable<string[]>;
  
  myControl2 = new FormControl();
  filteredOptions2!: Observable<string[]>;
  panelOpenState = false;

  search:any = '';

  ngOnInit() {
    this.findDormitorio();
    this.findHospedes();
    this.findAcompanhantes();
    this._findReservas(null);
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
     // map(value => this._filter(value))
     map(value => typeof value === 'string' ? value : value.fullname),
     map(fullname => fullname ? this._filter(fullname) : this.hospedes.slice())
    );

    this.filteredOptions2 = this.myControl2.valueChanges
    .pipe(
      startWith(''),
     // map(value => this._filter(value))
     map(value => typeof value === 'string' ? value : value.fullname),
     map(fullname => fullname ? this._filter(fullname) : this.acompanhantes.slice())
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    //return this.hospedes.filter(option => option.toLowerCase().includes(filterValue));
    //const filterValue = value.toLowerCase();
    return this.hospedes.filter((option: any) => option.toLowerCase().indexOf(filterValue) === 0);
  }
  
  displayFn(user: User): string {
    return user && user.fullname ? user.fullname : '';
  }

  displayFn2(user: User): string {
    return user && user.fullname ? user.fullname : '';
  }


  findDormitorio(){
    this.dormitorioService.find().subscribe(
      res=>{
         this.dormitorios = res;
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
  }
  findHospedes(){
    this.userService.find('HOSPEDE').subscribe(
      res=>{
        this.hospedes = res;
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
  }

  findAcompanhantes(){
    this.userService.find('ACOMPANHANTE').subscribe(
      res=>{
        this.acompanhantes = res;
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
  }

  salvarReserva(){
    this.reserva.consumo = this.freegobar;
    let hospede = this.myControl.value;
    this.reserva.idHospede = hospede._id;
    let user = this.authService.getUser();
    this.reserva.IdFuncionario = user['_id'];
    console.log('acompanhantes', this.myControl2.value);
    let aconpanhante = this.myControl2.value;
    this.reserva.acompanhantes.push(aconpanhante._id);
    this.reservaService.register(this.reserva).subscribe(
      res=>{
        this.reservas.push(res);
        this.reserva = {checkin:{}, checkout:{}, consumo:[], acompanhantes:[]};
        console.log(res)
        this._findReservas(null);
      },
      err=>{ 
        console.log(err)
      }
    )
  }

  incluirItemFreegobar(){
    let obj = Object.assign({},this.consumo);
    this.consumo = {};
    this.freegobar.push(obj)
  }

  excluirItemFreegobar(index:any){
    this.freegobar.splice(index,1); 
  }

  incluirItemFreegobarcheckout(item:any){
    let obj = Object.assign({},this.consumo);
    this.consumo = {};
    item.push(obj)
  }

  excluirItemFreegobarCheckout(item:any, index:any){
    item.splice(index,1); 
  }

  _findReservas(id:any){
    this.reservaService.find(id).subscribe(
      res=>{
        this.reservas = res;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }
  findReservas(){
    this._findReservas(this.search);
  }

  salvarFregobar(item:any){
    console.log('itemeditar',item);
    this.reservaService.updateFregobarConsumo(item._id, item.consumo).subscribe(
      res=>{
        console.log('respostaparaedicaoFregobar', res);
        this._findReservas(null);
      },
      err=>{
        console.log(err)
      }
    )
  }

  salvarItensFcheckout(item:any){
    this.reservaService.updateCheckout(item._id, item.checkout).subscribe(
      res=>{
        this._findReservas(null);
        console.log('respostaparaedicaocheckout', res);
      },
      err=>{
        console.log(err)
      }
    )
  }

}
