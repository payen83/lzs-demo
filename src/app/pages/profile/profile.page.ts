import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user_id: any;
  public user: any;
  constructor(public activatedRoute: ActivatedRoute) { 
    this.user_id = this.activatedRoute.snapshot.paramMap.get('id'); 
    this.user = { name: null, department: null };
  }

  ngOnInit() {
  }

  submit(){
    console.log('Nama Pengguna: ', this.user.name);    
    console.log('Department Pengguna: ', this.user.department);
  }

}
