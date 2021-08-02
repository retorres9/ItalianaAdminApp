import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  deserts: Product[] = [];
  beberage: Product[] = [];
  salads: Product[] = [];
  pizzas: Product[] = [];
  tab: string = 'pizzas';
  version: Date;
  needUpdate: boolean = false;

  constructor(private router: Router,
    private productService: ProductsService,
            private loadingCtrl: LoadingController,
            private storage: StorageService) {}

  ngOnInit() {
    const ver = JSON.parse(localStorage.getItem('version'));
    this.version = ver.date;
    this.productService.getVersion().subscribe(
      resp => {
        (resp.date === this.version) ? (this.needUpdate = false) : (this.needUpdate = true);
      }
    )
    if (!this.needUpdate && ver) {
      this.products = JSON.parse(localStorage.getItem('pizzas'))
      return;
    }
    this.productService.products.subscribe(
      resp => {
        this.products = resp;
      }
    )
  }
  segmentChanged(e) {
    console.log(e)
    this.tab = e.detail.value;
    this.loadingCtrl.create({
      message: 'Obteniendo productos'
    }).then(
      loadingEl => {
        loadingEl.present();
        if (!this.needUpdate) {
          this.products = JSON.parse(localStorage.getItem(`${this.tab}`))
          loadingEl.dismiss();
          return;
        }
        this.productService.getProducts(this.tab).subscribe(
          resp => {
            this.products = resp;
            loadingEl.dismiss();
          }
        )
      }
    )
  }

  onViewProduct(id: string) {
    console.log(id);
    this.router.navigateByUrl(`tabs/products/${id}/${this.tab}`)
  }

  onEditProduct(id: string, item: IonItemSliding) {
    item.close();
    console.log(id);
    this.router.navigateByUrl(`tabs/products/edit-product/${id}/${this.tab}`);
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      message: 'Obteniendo productos'
    }).then( loadingEl => {
      loadingEl.present();
      this.productService.getProducts(this.tab).subscribe(
        resp => {
          loadingEl.dismiss();
        }
      )
    }
    )
  }

  onNewProduct() {
    console.log(this.tab);
    this.router.navigate([`/tabs/products/new-product/${this.tab}`]);
  }
}
