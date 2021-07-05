import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then(
            (m) => m.ProductsPageModule
          ),
      },
      {
        path: 'coupons',
        loadChildren: () =>
          import('./coupons/coupons.module').then((m) => m.CouponsPageModule),
      },
      {
        path: '',
        redirectTo: 'tabs/products',
        pathMatch: 'full'
      }
    ],

  },
  {
    path: '',
    redirectTo: 'tabs/products',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
