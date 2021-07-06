import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap} from 'rxjs/operators';
import { Product } from './product.model';
import { Price } from './price.model';

interface ProductInt {
  name: string;
  description: string;
  prices: PriceInt[]
}

export interface PriceInt {
  type: string;
  retailSale: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _products = new BehaviorSubject<Product[]>([]);
  public get places() {
    return this._products.asObservable();
  }

  constructor(private http: HttpClient) { }

  getProducts() {
    const product = new Product();
    return this.http.get<Product>('https://proyectopizza-a1591-default-rtdb.firebaseio.com/pizzas.json').pipe(
      map(respData => {
        const products = [];
        for(const key in respData) {
          if (respData.hasOwnProperty(key)) {
            console.log(respData[key].name)
            product.name = respData[key].name;
            product.description = respData[key].description;
            product.prices = respData[key].prices
          }
          products.push({...product});
        }
        return products;
      }),
      tap((products)=> {
        console.log(products);
        return this._products.next(products)
      })
    );
  }

  saveProduct(name: string, description: string, prices: Price[]) {
    console.log('llega');

    const newProduct = new Product();
    newProduct.name = name;
    newProduct.description = description;
    newProduct.prices = prices;

    console.log(newProduct);

    return this.http.post<{name: string}>('https://proyectopizza-a1591-default-rtdb.firebaseio.com/pizzas.json',{...newProduct, id: null}).pipe(
      tap(resp => {
        console.log(resp);

      })
    );
  }
}
