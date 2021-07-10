import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.page.html',
  styleUrls: ['./view-product.page.scss'],
})
export class ViewProductPage implements OnInit {
  loadedProduct: Product;
  constructor(private activateRoute: ActivatedRoute,
              private productService: ProductsService) { }

  ngOnInit() {
    this.activateRoute.params.subscribe(
      ({id}) => {
        this.productService.getProduct(id).subscribe(
          resp => {
            this.loadedProduct = resp;
            console.log(this.loadedProduct);

          }
        )
      }
    )
  }

}
