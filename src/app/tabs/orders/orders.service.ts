import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {}

  getOrder(id) {
    return this.http.get<Order>(`https://proyectopizza-a1591-default-rtdb.firebaseio.com/orders/${id}.json`);
  }
}
