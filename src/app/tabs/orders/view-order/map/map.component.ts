import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: Leaflet.map;
  icon = Leaflet.icon({
      iconUrl: 'assets/marcador-de-mapa.png'
  });
  latlng: string[];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.showMap();
  }

  showMap() {

    this.map = Leaflet.map('mapView').setView(
      [this.latlng[0], this.latlng[1]],
      17
    );
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attibution: 'Pizzería La Italiana',
    }).addTo(this.map);
    Leaflet.marker([this.latlng[0], this.latlng[1]], {
      icon: this.icon,
      draggable: false
    }).addTo(this.map);
  }

  onCloseModal() {
    this.modalCtrl.dismiss();
  }

}
