import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
  standalone: false
})
export class PlaceDetailPage implements OnInit {

  place: any = {};
  mainImg: string = '';
  previewImages: string[] = [];
  morePhotos = 12;

  // Dynamic data
  isFavorite = false;
  showFull = false;

  get truncatedDesc(): string {
    if (!this.place?.description) return '';
    return this.showFull 
      ? this.place.description 
      : this.place.description.substring(0, 180) + (this.place.description.length > 180 ? '...' : '');
  }

  constructor(private navCtrl: NavController, private router: Router) {}

  ngOnInit() {
    // Hardcoded sample (or can come from route/state)
    this.place = {
      name: 'Calabasa',
      address: 'Gabaldon, Nueva Ecija',
      rating: '4.8',
      description: 'Calabasa River is a peaceful riverside destination known for its quiet atmosphere, clean water, and scenic forest surroundings. Many people visit to swim, unwind, camp, or enjoy a riverside picnic away from the noise of the city. The river has several spacious areas that are perfect for group gatherings, while the fresh mountain breeze and greenery make it an ideal place for relaxation. It’s also a good spot for stargazing if you choose to camp overnight.'
    };

    this.mainImg = 'assets/Calabasa.png';
    this.previewImages = [
      'assets/Calabasa.png',
      'assets/Calabasa2.png',
      'assets/Calabasa4.png',
    ];
  }

 changeMainImage(img: string) {
  const heroImg = document.querySelector('.hero-image img');
  if (heroImg) {
    heroImg.classList.add('fade');
  }

  setTimeout(() => {
    this.mainImg = img;

    setTimeout(() => {
      if (heroImg) {
        heroImg.classList.remove('fade');
      }
    }, 30);

  }, 200);
}

goToMap() {
  this.router.navigate(['/map'], {
    queryParams: {
      name: this.place?.name,
      lat: this.place?.lat,
      lng: this.place?.lng
    }
  });
}



  goBack() {
    this.navCtrl.back();
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
}
