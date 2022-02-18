import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  public notificationList: Array<any> = [];
  public savedNotifications: Array<any> = [];

  constructor(public storage: StorageService) { 
    this.notificationList = [
      { id: 1, title: "Sila bayar zakat pendapatan sebelum Ramadan", date: "18 Feb 2022" },
      { id: 2, title: "Anggaran bayaran zakat bagi tahun 1443H", date: "16 Feb 2022" },
      { id: 3, title: "Selamat tahun baru 2022", date: "10 Feb 2022" },
      { id: 4, title: "Selamat menunaikan zakat untuk tahun ini", date: "9 Feb 2022" }
    ];
  }

  ngOnInit() {
    this.getSavedNotifications();
  }

  async getSavedNotifications(){
    let tempData: any = await this.storage.getStorage('saved_notifications');

    if(tempData.value){
      // console.log(tempData)
      this.savedNotifications = JSON.parse(tempData.value);
    }
    
    console.log('saved notifications ==> ', this.savedNotifications);
  }

  async delete(item: any){
    let index = this.savedNotifications.findIndex((data) => { return data.id == item.id });
      if(index < 0){
        let newItem: any = { id: item.id, status: 'delete' };
        this.savedNotifications.push(newItem);
        // save data in local storage
      } else {
        // if item exist, we just set the item status to delete
        this.savedNotifications[index].status = 'delete';
      }
      await this.storage.setStorage('saved_notifications', this.savedNotifications);
  }

  async setNotificationRead(item: any){
    //1. Get item id
    //2. Save item id as read in localStorage
    //3. Perform checking in html whether the item has set as read or not (true/false)
      let index = this.savedNotifications.findIndex((data) => { return data.id == item.id });
      if(index < 0 ){
        let newItem: any = { id: item.id, status: 'read' };
        this.savedNotifications.push(newItem);
        // save data in local storage
        await this.storage.setStorage('saved_notifications', this.savedNotifications);

      }
      console.log(this.savedNotifications);
  }

  isRead(item: any) {
    // the function will return true if findIndex find the index number more than 0
    return this.savedNotifications.findIndex((data) => { return data.id == item.id }) >= 0;
  }

  isNotDeleted(item: any) {
    let index = this.savedNotifications.findIndex((data) => { return data.id == item.id });
    if(index > 0 && this.savedNotifications[index].status == 'delete'){
      return false;
    } else {
      return true;
    }
    
  }


}
