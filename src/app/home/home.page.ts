import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Category {
  name: string;
  icon: string;
  active: boolean;
}

interface Place {
  id?: number;
  name: string;
  location: string;
  rating: string;
  image: string;
  isFavorite: boolean;
  category?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  userName: string = 'Dave';
  
  places: Place[] = [];
  filteredPlaces: Place[] = [];

  categories: Category[] = [
    { name: 'Places', icon: 'location-outline', active: true },
    { name: 'Food', icon: 'restaurant-outline', active: false },
    { name: 'Shopping', icon: 'cart-outline', active: false },
    { name: 'Health', icon: 'medkit-outline', active: false },
    { name: 'Automotive', icon: 'car-outline', active: false },
    { name: 'Entertainment', icon: 'film-outline', active: false }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadPlaces();
    this.filterByCategory();
  }

  loadPlaces() {
    this.places = [
      {
        name: 'Gabaldon Falls',
        location: 'Gabaldon, Nueva Ecija (Foothills of Sierra Madre)',
        rating: '4.5',
        image: 'assets/gabaldon1.jpg',
        isFavorite: false,
        category: 'Places'
      },
      {
        name: 'Dupinga River',
        location: 'Brgy. Dupinga, Gabaldon, N.E',
        rating: '4.6',
        image: 'assets/Dupinga1.jpg',
        isFavorite: true,
        category: 'Places'
      },
      {
        name: 'Calabasa River',
        location: 'Bitulok & Sabani/Calabasa Area, Gabaldon',
        rating: '4.3',
        image: 'assets/Calabasa.png',
        isFavorite: false,
        category: 'Places'
      },
      {
        name: 'Gabaldon Eco-Park',
        location: 'Gabaldon Town',
        rating: '4.0',
        image: 'assets/Ecopark1.jpg',
        isFavorite: true,
        category: 'Entertainment'
      },
      {
        name: 'Mt. Sawi',
        location: 'Brgy. Malinao, Gabaldon, N.E',
        rating: '5.0',
        image: 'assets/Sawi1.png',
        isFavorite: false,
        category: 'Entertainment'
      }, 
      {
        name: 'Montana Conservation Camp',
        location: 'Brgy. Ligaya, Gabaldon, N.E',
        rating: '4.9',
        image: 'assets/Montana1.png',
        isFavorite: false,
        category: 'Entertainment'
      }
    ];

    this.filteredPlaces = [...this.places];
  }

  selectCategory(selected: Category) {
    this.categories.forEach(cat => cat.active = cat === selected);
    this.filterByCategory();
  }

  filterByCategory() {
    const activeCat = this.categories.find(c => c.active);
    if (activeCat) {
      this.filteredPlaces = this.places.filter(p => p.category === activeCat.name);
    } else {
      this.filteredPlaces = [...this.places];
    }
  }

  toggleFavorite(place: Place, event?: any) {
    const icon = event?.target?.closest("ion-button")?.querySelector("ion-icon");
    if (!icon) return;

    if (!place.isFavorite) {
      place.isFavorite = true;
      icon.classList.remove("heart-animate-remove");
      void icon.offsetWidth; // trigger reflow to restart animation
      icon.classList.add("heart-animate-add");
    } else {
      place.isFavorite = false;
      icon.classList.remove("heart-animate-add");
      void icon.offsetWidth;
      icon.classList.add("heart-animate-remove");
    }

    // Optional: save to backend or localStorage
  }

  onSearch(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    this.filteredPlaces = this.places.filter(place =>
      place.name.toLowerCase().includes(query) ||
      place.location.toLowerCase().includes(query)
    );
  }

  goToPlaceDetail(place: Place) {
    this.router.navigate(['/place-detail'], { state: { place } });
  }
}
