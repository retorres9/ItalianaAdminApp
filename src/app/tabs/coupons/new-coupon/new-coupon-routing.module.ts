import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCouponPage } from './new-coupon.page';

const routes: Routes = [
  {
    path: '',
    component: NewCouponPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCouponPageRoutingModule {}
