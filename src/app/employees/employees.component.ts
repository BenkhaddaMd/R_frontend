import { Component, OnInit } from '@angular/core';
import { profile } from '../profile/profile.component';
import { AllServicesService } from '../all-services.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})

export class EmployeesComponent implements OnInit {


  public showOrHide = false;
  showHide(){
    this.showOrHide = !this.showOrHide
  }  

  constructor(private myServ:AllServicesService) { }
  public AllEmployees : profile[] = [];
  ngOnInit(): void {
    this.myServ.getEmployees().subscribe(
      (data:profile[])=> {
        this.AllEmployees = data;
        let i=0
        for(let employee of this.AllEmployees ){
          this.AllEmployees[i++].image = `assets/img/avatars/`+employee.image;
        }
      }
    )

  }

  delete(email){
    this.myServ.deleteEmp(email).subscribe(
      data => this.deleteFromData(email)
    );
  }
  deleteFromData(data){
    let i=0;
    for(let emp of this.AllEmployees){
      if(emp.email == data)
        this.AllEmployees.splice(i,1)
      i++;
    }
  }
}
