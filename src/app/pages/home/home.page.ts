import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public nama_user: string;
  public user_id: any;
  constructor(public alertController: AlertController, public router: Router) {
    this.nama_user = 'Ferdy Fauzi';
    this.user_id = 789;
  }

  btnClick(){
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Perhatian',
      message: 'Welcome to LZS, ' + this.nama_user,
      buttons: ['OK']
    });
    await alert.present();
  }

  navigateM2(){
    this.router.navigateByUrl('/profile');
    console.log('This is my message');
  }


}
