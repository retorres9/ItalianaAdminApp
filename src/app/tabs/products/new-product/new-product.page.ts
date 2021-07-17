import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Price } from '../price.model';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  newProductForm: FormGroup;
  newProduct2Form: FormGroup;
  prices: Price[] = [];
  type: string;
  constructor(
    private productService: ProductsService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      ({tipo}) => {
        this.type = tipo;
      }
    );
    this.newProductForm = new FormGroup({
      prod_name: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      prod_image: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      prod_price: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)],
      }),
      prod_description: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(20)],
      }),
      prod_priceSm: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)],
      }),
      prod_priceMed: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)],
      }),
      prod_priceBig: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)],
      }),
      prod_priceFam: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)],
      }),
    });

    this.newProduct2Form = new FormGroup({
      prod2_name: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      prod2_image: new FormControl("", {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      prod2_price: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)],
      }),
      prod2_description: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(5)],
      })
    });
  }

  onSaveProduct() {
    console.log('new');
    const price1 = new Price();
    price1.type = 'Porción';
    price1.price = this.newProductForm.value.prod_price;
    const price2 = new Price();
    price2.type = 'Pequeña';
    price2.price = this.newProductForm.value.prod_priceSm;
    const price3 = new Price();
    price3.type = 'Mediana';
    price3.price = this.newProductForm.value.prod_priceMed;
    const price4 = new Price();
    price4.type = 'Grande';
    price4.price = this.newProductForm.value.prod_priceBig;
    const price5 = new Price();
    price5.type = 'Familiar';
    price5.price = this.newProductForm.value.prod_priceFam;
    this.prices.push(price1);
    this.prices.push(price2);
    this.prices.push(price3);
    this.prices.push(price4);
    this.prices.push(price5);
    console.log(this.prices);
    this.loadingCtrl.create({
      message: 'Creando producto'
    }).then(
      loadingEl => {
        loadingEl.present();
        this.productService
      .saveProduct(
        this.newProductForm.value.prod_name,
        this.newProductForm.value.prod_description,
        this.newProductForm.value.prod_image,
        this.prices
      )
      .subscribe(
        (resp) => {
          console.log(resp);
          loadingEl.dismiss();
          this.router.navigateByUrl('/tabs/products');
          this.newProductForm.reset();
        },
        (err) => console.log(err)
      );
      }
    );
  }

  onSaveProduct2() {
    const price2 = new Price();
    price2.type = "";
    price2.price = this.newProduct2Form.value.prod2_price;
    this.prices.push(price2);
    this.loadingCtrl.create({
      message: 'Creando producto'
    }).then(loadingEl => {
      loadingEl.present();
      this.productService.saveProduct2(
        this.newProduct2Form.value.prod2_name,
        this.newProduct2Form.value.prod2_description,
        this.newProduct2Form.value.prod2_image,
        this.prices,
        this.type
      ).subscribe(
        resp => {
          console.log(resp);
          this.loadingCtrl.dismiss();
          this.router.navigateByUrl('tabs/products');
          this.newProduct2Form.reset();
        }
      );
    })
  }
}
