import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, interval } from 'rxjs';
import { Address } from './address.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private _orders = new BehaviorSubject<Order[]>([]);
  public get orders() {
    return this._orders.asObservable();
  }

  constructor(private http: HttpClient) {}

  getOrder(id) {
    return this.http.get<Order>(
      `https://proyectopizza-a1591-default-rtdb.firebaseio.com/orders/${id}.json`
    );
  }

  getOrders() {
    const order = new Order();
    return this.http
      .get<Order[]>(
        'https://proyectopizza-a1591-default-rtdb.firebaseio.com/orders.json'
      )
      .pipe(
        map(
          (respData) => {
            const orders = [];
            for (const key in respData) {
              if (respData.hasOwnProperty(key)) {
                order.id = key;
                order.latlng = respData[key].latlng;
                order.reference = respData[key].reference;
                order.userId = respData[key].userId;
                order.date = respData[key].date;
                order.cart = respData[key].cart;
              }
              orders.push({...order});
            }
            return orders;
          }
        ),
        tap((resp)=> {
          return this._orders.next(resp);
      })
      );
  }

  onDenyOrder(id: string) {
    return this.http.delete(`https://proyectopizza-a1591-default-rtdb.firebaseio.com/orders/${id}.json`);
  }

  getGeocode(lat: number, lon: number) {
    console.log(lat, lon);

    return this.http.get<Address>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
  }
}
