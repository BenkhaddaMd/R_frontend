import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../all-services.service';
import { ThemeService } from 'ng2-charts';

class CommandLog{
  nombre:number;
  total:number;
  created_at:string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public myDate = new Date();
  public hours = 0;
  public nb_pl:number;
  public nb_cat:number;

  constructor(private myServ:AllServicesService, private themeService:ThemeService) { }

  ngOnInit(): void {
    this.utcTime();
    this.getNumbers();
    this.getCommandsLog();
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

  getNumbers(){
    this.myServ.getNumOfCat().subscribe((data:number)=>this.nb_cat=data);
    this.myServ.getNumOfPl().subscribe((data:number)=>this.nb_pl=data);
  }


  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['0', '0', '0', '0', '0', '0', '0'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Total avec DH'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Nombre des commandes'}
  ];

  public allLogs:CommandLog[] = [];
  getCommandsLog(){
    this.myServ.getCommandsLog().subscribe(
      (data:CommandLog[])=>{
        this.allLogs = data.reverse();
        this.barChartData[0].data = [];  
        this.barChartData[1].data = []; 
        this.barChartLabels = []    
        for(let one of this.allLogs){
          this.barChartLabels.push('Jour '+one.created_at.split(' ')[0].split('-')[2][0]+one.created_at.split(' ')[0].split('-')[2][1]);
          this.barChartData[0].data.push(one.total);
          this.barChartData[1].data.push(one.nombre);
          
        }        
      }
    )
  }


}
