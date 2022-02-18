import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Http, HttpDownloadFileResult } from '@capacitor-community/http';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public nama_user: string;
  public user_id: any;
  public url_: string = 'https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf';
  constructor(public alertController: AlertController, public router: Router) {
    this.nama_user = 'Ferdy Fauzi';
    this.user_id = 789;
    // document.body.setAttribute('color-theme', 'dark');
  }

  btnClick(){
    this.presentAlert();
  }

  openPDF(){
    Browser.open({ url: this.url_});
  }

  // this function is not used due to some issues, will check later..
  async downloadPDF(){

    // initiate download PDF using Http Protocol
    // open PDF using file opener (with some configuration)
    const file_name = this.url_.split('/').pop();
    
    const options = {
      url: this.url_,
      filePath: file_name,
      fileDirectory: Directory.Library
    };
  
    // Writes to local filesystem
    try {
    const response: HttpDownloadFileResult = await Http.downloadFile(options);
  
    // Then read the file
    if (response) {
      console.log('path result ===> ', JSON.stringify(response));
      // const read = await Filesystem.readFile({
      //   path: file_name,
      //   directory: Directory.Data,
      // });
      
      // console.log('read file result ===> ', JSON.stringify(read));

    } else {
      console.log('response not found!!! ');
    }

    } catch(err: any){
      console.log('error ', JSON.stringify(err));
    }
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

  changeTheme(event: any){
    // console.log(event);
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark');
      document.querySelector('#main-title').setAttribute('style', 'color: white');
    } else {
      document.body.setAttribute('color-theme', 'light');
      document.querySelector('#main-title').setAttribute('style', 'color: black');
    }
  }


}
