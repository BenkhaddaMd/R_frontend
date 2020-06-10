import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public myDate = new Date();
  public hours = 0;

  constructor() { }

  ngOnInit(): void {
    this.utcTime();
    
  }
  utcTime(): void {
    setInterval(()=>{
      let h = 0,m = 0;
      this.myDate = new Date();
      h = +this.myDate[Symbol.toPrimitive]('string').split(' ')[4].split(':')[0];  
      m = +this.myDate[Symbol.toPrimitive]('string').split(' ')[4].split(':')[1];  
        
      if(h >= 8 && h < 18){
        this.hours=(h-8+(m/60))*10;        
      }
      else this.hours=0;

    }, 1000);
  }
}
