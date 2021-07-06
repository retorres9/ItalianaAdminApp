import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
    this.productService.places.subscribe(
      resp => {
        this.products = resp;
      }
    )
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      message: 'Obteniendo productos'
    }).then( loadingEl => {
      loadingEl.present();
      this.productService.getProducts().subscribe(
        resp => {
          console.log(resp)
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
