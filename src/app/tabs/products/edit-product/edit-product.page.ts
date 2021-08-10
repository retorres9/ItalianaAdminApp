import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Price } from '../price.model';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../../storage.service';
class DateVersion {
  date: Date
}
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  loadedProduct: Product;
  editProductForm: FormGroup;
  prices: Price[] = [];
  prodId: string;
  type: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService,
    private alert: AlertController,
    private router: Router, private storage: StorageService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id, type }) => {
      this.type = type;
      this.productService.getProduct(id).subscribe((resp) => {
        this.prodId = id;
        this.loadedProduct = resp;
        console.log(this.loadedProduct);
        if (type === "pizzas") {
        this.editProductForm = new FormGroup({
          prod_name: new FormControl(this.loadedProduct.name, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          prod_description: new FormControl(this.loadedProduct.description, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          prod_image: new FormControl(this.loadedProduct.image, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          prod_price: new FormControl(this.loadedProduct.prices[0].price, {
            updateOn: 'change',
            validators: [Validators.required, Validators.min(1)],
          }),
          prod_priceSm: new FormControl(this.loadedProduct.prices[1].price, {
            updateOn: 'change',
            validators: [Validators.required, Validators.min(1)],
          }),
          prod_priceMed: new FormControl(this.loadedProduct.prices[2].price, {
            updateOn: 'change',
            validators: [Validators.required, Validators.min(1)],
          }),
          prod_priceBig: new FormControl(this.loadedProduct.prices[3].price, {
            updateOn: 'change',
            validators: [Validators.required, Validators.min(1)],
          }),
          prod_priceFam: new FormControl(this.loadedProduct.prices[4].price, {
            updateOn: 'change',
            validators: [Validators.required, Validators.min(1)],
          }),
        });
        }

        if (type !== "pizzas") {
          this.editProductForm = new FormGroup({
            prod_name: new FormControl(this.loadedProduct.name, {
              updateOn: 'change',
              validators: [Validators.required]
            }),
            prod_description: new FormControl(this.loadedProduct.description, {
              updateOn: 'change',
              validators: [Validators.required]
            }),
            prod_image: new FormControl(this.loadedProduct.image, {
              updateOn: 'change',
              validators: [Validators.required]
            }),
            prod_price: new FormControl(this.loadedProduct.prices[0].price, {
              updateOn: 'change',
              validators: [Validators.required, Validators.min(1)],
            }),
          });
          }
      });
    });
  }

  onEditProduct() {
    const product = new Product();
    const version = new DateVersion();
    version.date = new Date();
    product.name = this.editProductForm.value.prod_name;
    product.description = this.editProductForm.value.prod_description;
    product.image = this.editProductForm.value.prod_image;
    const price1 = new Price();
    if (this.type === 'pizzas') {
      price1.type = 'Porción';
      price1.price = this.editProductForm.value.prod_price;
      const price2 = new Price();
      price2.type = 'Pequeña';
      price2.price = this.editProductForm.value.prod_priceSm;
      const price3 = new Price();
      price3.type = 'Mediana';
      price3.price = this.editProductForm.value.prod_priceMed;
      const price4 = new Price();
      price4.type = 'Grande';
      price4.price = this.editProductForm.value.prod_priceBig;
      const price5 = new Price();
      price5.type = 'Familiar';
      price5.price = this.editProductForm.value.prod_priceFam;
      this.prices.push(price1);
      this.prices.push(price2);
      this.prices.push(price3);
      this.prices.push(price4);
      this.prices.push(price5);
    } else {
      price1.type = 'Porción';
      price1.price = this.editProductForm.value.prod_price;
      this.prices.push(price1);
    }
    console.log(this.prices);
    product.prices = this.prices;
    this.alert.create({
      header: 'Alerta',
      message: 'Seguro que deseas actualizar el producto',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.productService.updateProduct(product, this.prodId).subscribe(
              resp => {
                this.productService.updateVersion(version).subscribe(
                  resp => {
                    localStorage.setItem('version', JSON.stringify(version));
                  }
                );
                this.router.navigateByUrl('tabs/products');
              }
            );
          }
        }
      ]
    }).then(
      alertElement => {
        alertElement.present();
      }
    );
  }
}
