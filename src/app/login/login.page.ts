import { Component } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  password: string = '';

  showPassword = false;

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // ⭐ UPDATED SIGN-IN WITH LOADING
  async signIn() {
    if (!this.email || !this.password) {
      const loading = await this.loadingCtrl.create({
        message: 'Checking...',
        spinner: 'crescent',
        duration: 1200,
        cssClass: 'login-loading'
      });
      await loading.present();
      return;
    }

    // SHOW LOADING WHILE "LOGGING IN"
    const loading = await this.loadingCtrl.create({
      message: 'Signing in...',
      spinner: 'crescent',
      duration: 1500,
      cssClass: 'login-loading'
    });

    await loading.present();

    setTimeout(() => {
      this.navCtrl.navigateRoot('/tabs/home');
    }, 1500);
  }

  forgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }

  goBack() {
    window.history.back();
  }

  goToSignup() {
    this.navCtrl.navigateForward('/signup');
  }
}
