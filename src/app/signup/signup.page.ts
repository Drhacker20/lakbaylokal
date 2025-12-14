import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { auth, db } from '../firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false
})
export class SignupPage implements OnInit {

  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\+\-\s]{7,20}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(group: FormGroup) {
    const pw = group.get('password')?.value;
    const cpw = group.get('confirmPassword')?.value;
    return pw === cpw ? null : { notMatching: true };
  }

  async create() {
    if (this.registerForm.invalid) {
      const alert = await this.alertCtrl.create({
        header: 'Invalid Form',
        message: 'Please complete the form correctly before creating your account.',
        buttons: ['OK'],
        cssClass: 'error-alert'
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Creating account...',
      spinner: 'crescent',
      cssClass: 'signup-loading'
    });
    await loading.present();

    const { username, email, password, phone } = this.registerForm.value;

    try {
      // ✅ Create user in Firebase Auth emulator
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Update display name
      await updateProfile(userCredential.user, { displayName: username });

      // ✅ Save additional user info in Firestore emulator
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username,
        email,
        phone,
        createdAt: serverTimestamp()
      });

      await loading.dismiss();

      // ✅ Success popup
      const success = await this.alertCtrl.create({
        header: 'Success!',
        message: 'Your account has been successfully created.',
        buttons: [{
          text: 'Continue',
          handler: () => this.navCtrl.navigateRoot('/login')
        }],
        cssClass: 'success-alert'
      });
      await success.present();

    } catch (error: any) {
      await loading.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Signup Error',
        message: error.message,
        buttons: ['OK'],
        cssClass: 'error-alert'
      });
      await alert.present();
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
