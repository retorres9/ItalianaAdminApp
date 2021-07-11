import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  constructor(private router: Router,
    private productService: ProductsService,
            private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.productService.products.subscribe(
      resp => {
        this.products = resp;
      }
    )
  }
  segmentChanged(e) {
    console.log(e.detail.value);
  }

  onViewProduct(id: string) {
    console.log(id);
    this.router.navigateByUrl(`tabs/products/${id}`)
  }

  onEditProduct(id: string, item: IonItemSliding) {
    item.close();
    console.log(id);
    this.router.navigateByUrl(`tabs/products/edit-product/${id}`);
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      message: 'Obteniendo productos'
    }).then( loadingEl => {
      loadingEl.present();
      this.productService.getProducts().subscribe(
        resp => {
          loadingEl.dismiss();
        }
      )
    }
    )
  }

  onNewProduct() {
    this.router.navigate(['/tabs/products/new-product']);
  }
}
