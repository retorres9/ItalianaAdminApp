import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../orders.service';
import { Order, States } from '../order.model';
import { LoadingController, ModalController } from '@ionic/angular';
import { MapComponent } from './map/map.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit, OnDestroy {
  order: Order;
  totalOrder: number;
  road: string;
  neighbourhood: string;
  orderId: string;

  geocode: boolean = true;

  isError: boolean = false;

  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersService: OrdersService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe(({ orderId }) => {
      this.orderId = orderId;

      this.loadingCtrl
        .create({
          message: 'Cargando orden',
          backdropDismiss: true,
        })
        .then((loadingElement) => {
          loadingElement.present();
          this.subscription = this.ordersService.getOrder(orderId).subscribe((resp) => {
            this.order = resp;
            for (const key in resp.cart) {
              if (resp.cart.hasOwnProperty(key)) {
                const element = resp.cart[key];
                // element.isReady = false;
                // console.log(element);
              }
            }

            loadingElement.dismiss();
            this.ordersService.getGeocode(Number(this.order.latlng[0]), Number(this.order.latlng[1]))
            .subscribe((resp) => {
              this.road = resp.address.road;
              this.neighbourhood = resp.address.neighbourhood;
              this.geocode = false;
              this.isError = false;
              this.calculateTotal();
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

  generateDelivery() {
    console.log('Entrega enviada');

  }

  denyOrder() {
    this.loadingCtrl.create({
      message: 'Rechazando la orden'
    }).then(
      loadingElement => {
        loadingElement.present();
        console.log('mostrando orden' + this.orderId);

        this.ordersService.onDenyOrder(this.orderId).subscribe(
          resp => {
            console.log(resp);

            this.router.navigate(['tabs/orders']);
            loadingElement.dismiss();
          }
        );
      }
    )

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
