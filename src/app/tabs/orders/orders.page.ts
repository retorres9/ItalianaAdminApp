import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Order } from './order.model';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: Order[]
  constructor(private ordersService: OrdersService,
              private loadingCtrl: LoadingController,
              private router: Router) { }

  ngOnInit() {
    this.ordersService.orders.subscribe(
      orders => {
        this.orders = orders;
        console.log(this.orders);

      }
    )
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({
      message: 'Cargando Pedidos'
    }).then(loadingElement => {
      loadingElement.present();
      this.ordersService.getOrders().subscribe(
        resp => {
          loadingElement.dismiss();
        }
      );
    })
  }

  watchOrder(id: string) {
      this.router.navigate([`tabs/orders/${id}`]);
  }
}
