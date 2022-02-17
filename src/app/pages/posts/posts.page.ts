import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  public data: any;
  public post: any = { title: null, body: null };
  constructor(public api: ApiService) { }

  ngOnInit() {
    this.getPostMethod2();
  }

  submitPost(){
    this.api.submitPost(this.post).then((response: any) => {
      console.log('OK ==> ', response);
    }).catch(error => {
      console.log('ERROR ==> ' ,error);
      // present alert message here
    });
  }

  getPostMethod1(){
    // method 1
    this.api.getAllPost().then((response: any) => {
      this.data = response;
      console.log(this.data);
    }).catch(error => {
      console.log(error);
      // present alert message here
    });

  }

  async getPostMethod2(){
    //method 2
    try {
      this.data = await this.api.getAllPost();
      console.log(this.data);
    } catch (error) {
      console.log(error);
      // present alert message here
    }
    

  }


}
