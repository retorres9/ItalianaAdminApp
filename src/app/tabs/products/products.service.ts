import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap} from 'rxjs/operators';
import { Product } from './product.model';
import { Price } from './price.model';
import { StorageService } from '../../storage.service';

interface ProductInt {
  name: string;
  description: string;
  prices: PriceInt[]
}

class DateVersion {
  date: Date
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
  public get products() {
    return this._products.asObservable();
  }

  constructor(private http: HttpClient) { }

  getProducts() {
    const product = new Product();
    return this.http.get<Product>(`https://proyectopizza-a1591-default-rtdb.firebaseio.com/products.json`).pipe(
      map(respData => {
        const products = [];
        for(const key in respData) {
          if (respData.hasOwnProperty(key)) {
            product.id = key;
            product.name = respData[key].name;
            product.description = respData[key].description;
            product.prices = respData[key].prices;
            product.image = respData[key].image;
            product.type = respData[key].type;
          }
          products.push({...product});
        }
        localStorage.setItem('products', JSON.stringify(products));
        return products;
      }),
      tap((products)=> {
        return this._products.next(products)
      })
    );
  }

  saveProduct(name: string, description: string, image: string, prices: Price[], type: string) {
    console.log('llega');

    const newProduct = new Product();
    newProduct.name = name;
    newProduct.description = description;
    newProduct.image = image;
    newProduct.prices = prices;
    newProduct.type = type

    console.log(newProduct);

    return this.http.post<{name: string}>('https://proyectopizza-a1591-default-rtdb.firebaseio.com/products.json',{...newProduct, id: null}).pipe(
      tap(resp => {
        console.log(resp);

      })
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`https://proyectopizza-a1591-default-rtdb.firebaseio.com/products/${id}.json`).pipe(
      map(respData => {
        const product = new Product();
        product.id = id;
        product.name = respData.name;
        product.description = respData.description;
        product.image = respData.image;
        product.prices = respData.prices;
        return product;
      })
    );
  }

  updateProduct(productArr: Product, id: string) {
    let updatedProduct: Product[];
    return this.products.pipe(
      take(1),
      switchMap((products) => {
        const updateProductIdx = products.findIndex(
          (product) => product.id === productArr.id
        );
        updatedProduct = [...products];
        updatedProduct[updateProductIdx] = new Product();
        updatedProduct[updateProductIdx].id = productArr.id;
        updatedProduct[updateProductIdx].name = productArr.name;
        updatedProduct[updateProductIdx].description = productArr.description;
        updatedProduct[updateProductIdx].image = productArr.image;
        console.log(productArr.prices);

        updatedProduct[updateProductIdx].prices = productArr.prices;
        return this.http.put(`https://proyectopizza-a1591-default-rtdb.firebaseio.com/products/${id}.json`,{...updatedProduct[updateProductIdx], id: null})
      }),
      tap(() => {
        this._products.next(updatedProduct);
      })
    )
  }

  saveProduct2(name: string, description: string, image: string, prices: Price[], type: string) {
    console.log(type);
    const product = new Product();
    product.name = name;
    product.description = description;
    product.image = image;
    product.prices = prices;
    product.type = type
    console.log(product);
    return this.http.post<{name: string}>(`https://proyectopizza-a1591-default-rtdb.firebaseio.com/products.json`, {...product, id: null});
  }

  updateVersion(version: DateVersion) {
    return this.http.put(`https://proyectopizza-a1591-default-rtdb.firebaseio.com/version.json`, {...version, id: null});
  }

  getVersion() {
    return this.http.get<DateVersion>('https://proyectopizza-a1591-default-rtdb.firebaseio.com/version.json').pipe(
      tap(resp => {
        console.log(resp);
      })
    );
  }
}
