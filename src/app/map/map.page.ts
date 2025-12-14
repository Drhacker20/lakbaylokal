import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: false
})
export class MapPage implements OnInit, AfterViewInit {

  place: any = null;
  map: L.Map | undefined;
  marker: any;

  // ⭐ Favorite toggle
  isFavorite: boolean = false;

  // Description expand
  showFull: boolean = false;
  truncatedDesc: string = '';

  constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

  ngOnInit() {
    // ⭐ Correct coordinates for Gabaldon Municipal Hall
    this.place = {
      name: 'Gabaldon Municipal Hall',
      address: 'Gabaldon, Nueva Ecija',
      rating: 4.7,
      latitude: 15.45576,
      longitude: 121.33778,
      description:
        'Gabaldon Municipal Hall is the central government office of the town, located near the main plaza. This historic place serves as the heart of local administration and public services.',
    };

    this.truncatedDesc =
      this.place.description.length > 180
        ? this.place.description.substring(0, 180)
        : this.place.description;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initMap();
    }, 200);
  }

  initMap() {
    if (!this.place) return;

    this.map = L.map('map', {
      zoomControl: false,
      dragging: true,
      scrollWheelZoom: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(this.map);

    // ⭐ Red icon for Municipal Hall
    const hallIcon = L.icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    // Municipal Hall Marker
    const hallMarker = L.marker(
      [this.place.latitude, this.place.longitude],
      { icon: hallIcon }
    )
      .addTo(this.map)
      .bindPopup(`<b>${this.place.name}</b><br>${this.place.address}`);

    // ⭐ Blue icon for Calabasa River
    const riverIcon = L.icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    // ⭐ Correct Calabasa River coordinates (inside Gabaldon)
    const riverMarker = L.marker([15.4584, 121.3309], { icon: riverIcon })
      .addTo(this.map)
      .bindPopup('<b>Calabasa River</b><br>Gabaldon, Nueva Ecija');

    // ⭐ Adjust map to fit both markers properly
    const group = L.featureGroup([hallMarker, riverMarker]);
    this.map.fitBounds(group.getBounds().pad(0.2));
  }

  // ⭐ Favorite toggle
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  openDirections() {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${this.place.latitude},${this.place.longitude}`,
      '_blank'
    );
  }

  goBack() {
    this.navCtrl.back();
  }
}
