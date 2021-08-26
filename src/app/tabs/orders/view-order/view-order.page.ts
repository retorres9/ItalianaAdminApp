import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {

  order: Order;
  constructor(private activatedRoute: ActivatedRoute, private ordersService: OrdersService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe(({orderId}) => {
      console.log(orderId);
      this.ordersService.getOrder(orderId).subscribe(
        resp => {
          console.log(resp);
          this.order = resp
        }
      )
    })
  }

}
