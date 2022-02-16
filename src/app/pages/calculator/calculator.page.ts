import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('hello there');
    alert('this is me');
  }

  contactUs(){
    //this is function contact us..
  }

}
