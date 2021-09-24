import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCouponPageRoutingModule } from './new-coupon-routing.module';

import { NewCouponPage } from './new-coupon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NewCouponPageRoutingModule
  ],
  declarations: [NewCouponPage]
})
export class NewCouponPageModule {}
