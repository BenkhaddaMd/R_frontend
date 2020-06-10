import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../all-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private myServ:AllServicesService) { }
  public urlImage = '';
  public profile : profile = {name:'',email:'',fonction:'',image:''};
  ngOnInit(): void {
    let email = atob(localStorage.getItem('email'));
    this.myServ.profile(email).subscribe(
      (data:profile)=> {
        this.profile = data;
        this.urlImage = `assets/img/avatars/`+this.profile.image;       
      }
    )

  }

}

export class profile {
  name:string;
  email:string;
  fonction:string;
  image:string;
}