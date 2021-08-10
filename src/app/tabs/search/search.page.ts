import { Component, OnInit } from '@angular/core';
import { Product } from '../products/product.model';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  products: Product[];
  search: Product[] = [];
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.products = JSON.parse(localStorage.getItem('products'));
    console.log(this.products);
  }

  searchProduct(search) {
    (search.value === "") ? true : this.searchInObject(search.value);
  }

  private searchInObject(search: string) {
    this.search = [];
    this.products.forEach(
      item => {
        item.name.toLowerCase().includes(search.toLowerCase()) ? this.search.push(item): false;
      }
    )
  }
}


