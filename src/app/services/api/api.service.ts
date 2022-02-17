import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseURL: string = 'https://jsonplaceholder.typicode.com';
  constructor(public httpClient: HttpClient) { }

  getAllPost(){
    let url: string = this.baseURL + '/posts';

    return new Promise((resolve, reject) => {
      this.httpClient.get(url)
      .subscribe((res: any) => {
        resolve(res);
      }, err => { reject(err); })
    })
  }

  submitPost(post: any){
    let url: string = this.baseURL + '/posts';
    let body = JSON.stringify(post);
    let headers_ = new HttpHeaders();
    // let token = //get from login response.
    headers_.append('Content-Type', 'application/json; charset=UTF-8');
    // headers_.append('Authentication', 'bearer' + token);

    return new Promise((resolve, reject) => {
      this.httpClient.post(url, body, { headers: headers_ })
      .subscribe((res: any) => {
        resolve(res);
      }, err => { reject(err); })

    })
  }

}
