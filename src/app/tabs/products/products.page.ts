import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { StorageService } from '../../storage.service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  deserts:  Product[] = [];
  beberage: Product[] = [];
  salads:   Product[] = [];
  pizzas:   Product[] = [];
  tab: string = 'pizzas';
  version: Date;
  needUpdate: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductsService,
    private loadingCtrl: LoadingController,
    private storage: StorageService,
    private firebaseX: FirebaseX
  ) {}

  ngOnInit() {
    let serverVersion;
    const version = JSON.parse(localStorage.getItem('version'));
    version === null || version.length === 0
      ? localStorage.setItem('version', JSON.stringify(''))
      : (this.version = JSON.parse(localStorage.getItem('version')));
    this.productService
      .getVersion()
      .subscribe((versionFromsServer) => (serverVersion = versionFromsServer));
    if (serverVersion > this.version) {
      this.productService.getProducts().subscribe((resp) => console.log(resp));
    }

    this.productService.products.subscribe((resp) => {
      this.products = resp.filter((product) => product.type === `${this.tab}`);
    });

    this.firebaseX.getToken()
  .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
  .catch(error => console.error('Error getting token', error));

this.firebaseX.onMessageReceived()
  .subscribe(data => {
    if (data.tap) {
      console.log(data);
      this.router.navigate([`tabs/orders/${data.orderId}`]);
    }
  });

this.firebaseX.onTokenRefresh()
  .subscribe((token: string) => console.log(`Got a new token ${token}`));
  }
  segmentChanged(e) {
    this.tab = e.detail.value;
    this.loadingCtrl
      .create({
        message: 'Obteniendo productos',
      })
      .then((loadingEl) => {
        loadingEl.present();
        const asd = JSON.parse(localStorage.getItem('products'));
        console.log(this.products);

        this.products = asd.filter(
          (product) => {
            console.log(product.type);
            console.log(`${this.tab}`);
            return product.type === `${this.tab}`
          }
          );
          loadingEl.dismiss();
        console.log(this.products);
      });
  }

  onViewProduct(id: string) {
    this.router.navigateByUrl(`tabs/products/${id}/${this.tab}`);
  }

  onEditProduct(id: string, item: IonItemSliding) {
    item.close();
    this.router.navigateByUrl(`tabs/products/edit-product/${id}/${this.tab}`);
  }

  ionViewWillEnter() {
    this.loadingCtrl
      .create({
        message: 'Obteniendo productos',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.products = JSON.parse(localStorage.getItem(`${this.tab}`));
        if (this.version && this.products) {
          loadingEl.dismiss();
          return;
        }
        this.productService.getProducts().subscribe((resp) => {
          loadingEl.dismiss();
        });
      });
  }

  onNewProduct() {
    this.router.navigate([`/tabs/products/new-product/${this.tab}`]);
  }

}
