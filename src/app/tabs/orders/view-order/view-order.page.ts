import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import { Order, States } from '../order.model';
import { LoadingController, ModalController } from '@ionic/angular';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {
  order: Order;
  totalOrder: number;

  geocode: boolean = true;

  road: string;
  neighbourhood: string;

  isError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe(({ orderId }) => {
      console.log(orderId);
      this.loadingCtrl
        .create({
          message: 'Cargando orden',
          backdropDismiss: true,
        })
        .then((loadingElement) => {
          loadingElement.present();
          this.ordersService.getOrder(orderId).subscribe((resp) => {
            this.order = resp;
            this.calculateTotal();
            console.log(this.order);

            loadingElement.dismiss();
            this.ordersService
      .getGeocode(Number(this.order.latlng[0]), Number(this.order.latlng[1]))
      .subscribe((resp) => {
        this.road = resp.address.road;
        this.neighbourhood = resp.address.neighbourhood;
        this.geocode = false;
        this.isError = false;
      }, (error) => {
        this.isError = true;
        loadingElement.dismiss();
      });
          });
        });
    });
  }

  colorItemState() {
    return this.order.state === 'Pending'
      ? 'warning'
      : this.order.state === 'Active'
      ? 'success'
      : 'danger';
  }

  acceptOrder() {
    this.order.state = States.active;
    this.colorItemState();
  }

  denyOrder() {

  }

  onWatchLocation() {
    this.modalCtrl
      .create({
        component: MapComponent,
        swipeToClose: true,
        componentProps: { latlng: this.order.latlng },
      })
      .then((modalElement) => {
        modalElement.present();
      });
  }

  private calculateTotal() {
    this.totalOrder = this.order.cart.reduce(
      (total, order) => total + order.totalAmount,
      0
    );
  }
}
