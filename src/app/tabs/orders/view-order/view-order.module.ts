import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOrderPageRoutingModule } from './view-order-routing.module';

import { ViewOrderPage } from './view-order.page';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ViewOrderPageRoutingModule
  ],
  declarations: [ViewOrderPage, MapComponent]
})
export class ViewOrderPageModule {}
