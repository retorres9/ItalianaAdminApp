import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponsPage } from './coupons.page';

const routes: Routes = [
  {
    path: '',
    component: CouponsPage
  },
  {
    path: 'new-coupon',
    loadChildren: () => import('./new-coupon/new-coupon.module').then( m => m.NewCouponPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponsPageRoutingModule {}
