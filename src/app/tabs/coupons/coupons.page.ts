import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from './coupon-service.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {
  coupons: any;
  constructor(private router: Router,
              private couponService: CouponService) { }

  ngOnInit() {
    this.couponService.coupons.subscribe(
      resp => {
        this.coupons = resp;
        console.log(resp);

      }
    );
  }

  ionViewWillEnter() {
    this.couponService.getAllCoupons().subscribe()
  }

  onNewCoupon() {
    this.router.navigateByUrl('tabs/coupons/new-coupon');
  }

}
