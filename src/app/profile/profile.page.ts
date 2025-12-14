import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage {

  userName = "Dave John Reyes";
  userEmail = "dave.john@email.com";
  userPhone = "+63 912 345 6789";

  userImage = "assets/default-avatar.png";

  // password data
  realPassword = "mySecretPass123";
  showPassword = false;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  // ⭐ PICK FILE
  openFilePicker(fileInput: any) {
    fileInput.click();
  }

  // ⭐ HANDLE SELECTED IMAGE
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.userImage = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  // ⭐ TOGGLE PASSWORD VISIBILITY
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // ⭐ EDIT NAME
  async editName() {
    const alert = await this.alertCtrl.create({
      header: "Edit Name",
      cssClass: "custom-alert",
      inputs: [
        { name: 'name', type: 'text', value: this.userName }
      ],
      buttons: [
        { text: "Cancel", role: 'cancel' },
        { text: "Save", handler: (data) => this.userName = data.name }
      ]
    });
    alert.present();
  }

  // ⭐ EDIT EMAIL
  async editEmail() {
    const alert = await this.alertCtrl.create({
      header: "Edit Email",
      cssClass: "custom-alert",
      inputs: [
        { name: 'email', type: 'email', value: this.userEmail }
      ],
      buttons: [
        { text: "Cancel", role: 'cancel' },
        { text: "Save", handler: (data) => this.userEmail = data.email }
      ]
    });
    alert.present();
  }

  // ⭐ EDIT PHONE
  async editPhone() {
    const alert = await this.alertCtrl.create({
      header: "Edit Phone Number",
      cssClass: "custom-alert",
      inputs: [
        { name: 'phone', type: 'text', value: this.userPhone }
      ],
      buttons: [
        { text: "Cancel", role: 'cancel' },
        { text: "Save", handler: (data) => this.userPhone = data.phone }
      ]
    });
    alert.present();
  }

  // ⭐ EDIT PASSWORD
  async editPassword() {
    const alert = await this.alertCtrl.create({
      header: "Change Password",
      cssClass: "custom-alert",
      inputs: [
        { name: 'pass', type: 'password', placeholder: 'New Password' }
      ],
      buttons: [
        { text: "Cancel", role: 'cancel' },
        {
          text: "Save",
          handler: (data) => {
            if (data.pass.trim() !== "") {
              this.realPassword = data.pass;
            }
          }
        }
      ]
    });
    alert.present();
  }

  // ⭐ SIGN OUT WITH LOADING + REDIRECT
  async logout() {
    const loading = await this.loadingCtrl.create({
      message: 'Signing out...',
      spinner: 'crescent',
      cssClass: 'logout-loading',
      duration: 1200
    });

    await loading.present();

    setTimeout(() => {
      this.router.navigate(['/login'], { replaceUrl: true });
    }, 1200);
  }

}
