import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReservaService {

  constructor(private http: HttpClient) {}

  register(json:any) { return this.http.post('/api/reserva', json) };

  find(nome:any) { return this.http.get('/api/reserva' + (nome ? '?nome='+nome:'')) }; 
  findById(id:any) { return this.http.get('/api/reserva/id/'+id) }; 
  updateFregobarConsumo(id:any, json:any) { return this.http.put('/api/reserva/consumo/'+id, json) }; 
  updateCheckout(id:any, json:any) { return this.http.put('/api/reserva/checkout/'+id, json) }; 
}
