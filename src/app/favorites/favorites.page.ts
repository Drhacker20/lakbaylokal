import { Component, OnInit } from '@angular/core';

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
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false
})
export class FavoritesPage implements OnInit {

  userName: string = 'Favorites'; // Displayed as page title
  
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

  ngOnInit() {
    this.loadPlaces();
    this.filterFavorites(); // Only favorites
    this.filterByCategory(); // Apply category filter
  }

  loadPlaces() {
    // Sample data (replace with real backend if needed)
    this.places = [
      {
        name: 'Gabaldon Falls',
        location: 'Gabaldon, Nueva Ecija(Foothills of Sierra Madre)',
        rating: '4.5',
        image: 'assets/gabaldon1.jpg',
        isFavorite: true,
        category: 'Places'
      },
      {
        name: 'Dupinga River',
        location: 'Brgy. Dupinga, Gabaldon, N.E',
        rating: '4.6',
        image: 'assets/Dupinga1.jpg',
        isFavorite: false,
        category: 'Places'
      },
      {
        name: 'Calabasa River',
        location: 'Bitulok & Sabani/Calabasa Area, Gabaldon',
        rating: '4.3',
        image: 'assets/Calabasa.png',
        isFavorite: true,
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
        name: 'Mt.Sawi',
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
        isFavorite: true,
        category: 'Entertainment'
      }
    ];
  }

  // Filter only favorite places
  filterFavorites() {
    this.filteredPlaces = this.places.filter(p => p.isFavorite);
  }

  selectCategory(selected: Category) {
    this.categories.forEach(cat => cat.active = cat === selected);
    this.filterByCategory();
  }

  filterByCategory() {
    const activeCat = this.categories.find(c => c.active);
    if (!activeCat) return;

    this.filteredPlaces = this.places
      .filter(p => p.isFavorite) // Only favorites
      .filter(p => activeCat.name === 'All' || p.category === activeCat.name);
  }

  toggleFavorite(place: Place, event?: any) {
  const icon = event?.target?.closest("ion-button")?.querySelector("ion-icon");
  if (!icon) return;

  if (!place.isFavorite) {
    place.isFavorite = true;
    icon.classList.remove("heart-animate-remove");
    void icon.offsetWidth;
    icon.classList.add("heart-animate-add");
  } else {
    place.isFavorite = false;
    icon.classList.remove("heart-animate-add");
    void icon.offsetWidth;
    icon.classList.add("heart-animate-remove");
  }

  // Update list after removing
  this.filterFavorites();
  this.filterByCategory();
}


  onSearch(event: any) {
    const query = event.target.value?.toLowerCase() || '';
    this.filteredPlaces = this.places
      .filter(p => p.isFavorite)
      .filter(place =>
        place.name.toLowerCase().includes(query) ||
        place.location.toLowerCase().includes(query)
      );
  }

  goToPlaceDetail(place: Place) {
    // Navigate to place detail page
    console.log('Go to detail:', place.name);
  }
}
