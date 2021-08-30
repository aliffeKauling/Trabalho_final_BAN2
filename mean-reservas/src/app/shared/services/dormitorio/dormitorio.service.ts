import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DormitorioService {

  constructor(private http: HttpClient) {}

  register(json:any) { return this.http.post('/api/dormitorio', json) };
  find() { return this.http.get('/api/dormitorio') };
}
