import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from './coupon.model';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private _coupons = new BehaviorSubject<Coupon[]>([]);
  public get coupons() {
    return this._coupons.asObservable();
  }

  constructor(private http: HttpClient) {}

  onSaveCoupon(coupon: Coupon) {
    return this.http.post<{ name: string }>(
      'https://proyectopizza-a1591-default-rtdb.firebaseio.com/coupons.json',
      { ...coupon, id: null }
    );
  }

  getAllCoupons() {
    return this.http
      .get<{ [key: string]: Coupon }>(
        'https://proyectopizza-a1591-default-rtdb.firebaseio.com/coupons.json'
      )
      .pipe(
        map((resp) => {
          console.log(resp);

          const coupons = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              coupons.push(
                new Coupon(
                  key,
                  resp[key].name,
                  resp[key].url,
                  resp[key].price,
                  resp[key].desc,
                  resp[key].validTo
                )
              );
            }
          }
          return coupons;
        }),
        tap((places) => {
          return this._coupons.next(places);
        })
      );
  }
}
