import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products = [
    {
      name: 'Pizza Hawaiana',
      image: 'https://t2.rg.ltmcdn.com/es/images/0/2/6/img_pizza_hawaiana_de_jamon_y_pina_50620_orig.jpg',
      sizes: [
        {
          type: 'personal',
          price: 1.5
        },
        {
          type: 'mediana',
          price: 5.0,
        }
      ],
      description: 'Pizza hawaina, contiene, jamón, piña, queso mozzarella',
    }
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  onNewProduct() {
    this.router.navigate(['/tabs/products/new-product']);
  }
}
