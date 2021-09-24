import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Coupon } from '../coupon.model';
import { CouponService } from '../coupon-service.service';

@Component({
  selector: 'app-new-coupon',
  templateUrl: './new-coupon.page.html',
  styleUrls: ['./new-coupon.page.scss'],
})
export class NewCouponPage implements OnInit {
  minDate: string;
  maxDate: string;

  couponForm: FormGroup;
  constructor(private couponService: CouponService) { }

  ngOnInit() {
    this.minDate = new Date().toISOString();
    let day = new Date();
    day.setDate(day.getDate() + 15);
    this.maxDate = day.toISOString();
    this.couponForm = new FormGroup({
      name: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      img: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      price: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(5)]
      }),
      description: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      validTo: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required]
      })
    })
  }

  onSaveCoupon() {
    const couponFormValues = this.couponForm.value;
    const coupon = new Coupon(null,
      couponFormValues.name,
      couponFormValues.img,
      couponFormValues.price,
      couponFormValues.description,
      couponFormValues.validTo
      );
      this.couponService.onSaveCoupon({...coupon}).subscribe();

  }
}
