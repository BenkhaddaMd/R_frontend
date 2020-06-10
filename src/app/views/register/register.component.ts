import { Component } from '@angular/core';
import { AllServicesService } from '../../all-services.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
interface fonction {
  value: string;
  viewValue: string;
}
export class registre{
  username:string;
  email:string;
  fonction:string;
  password:string;
  r_password:string;
  image:string;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  hide = true;

  public registre:registre = {
    username:'',
    email:'',
    fonction:'',
    password:'',
    r_password:'',
    image:''
  };
  selectedImage:File = null;

  public errors = [];
    fonctions: fonction[] = [
    {value: 'Serveur', viewValue: 'Serveur'},
    {value: 'Comptoiriste', viewValue: 'Comptoiriste'},
    {value: 'Caissier', viewValue: 'Caissier'},
    {value: 'Admin', viewValue: 'Admin'}
  ];

  onSubmit(){
    this.myServ.registre(this.registre).subscribe(
      data => {
        this.onUpload();
        this.registre = new registre();
        this._snackBar.open("Vous avez ajouté un employé avec succes","OK", {
          duration: 5000,
        });
        this.errors = [];
      },
      error => this.handleError(error)
    )
  }
  handleError(error){
    this.errors = error.error.errors;
  }
  onImagesSelected(event){
    this.selectedImage = <File>event.target.files[0];
    this.registre.image = this.selectedImage.name;
  
  }
  
  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedImage, this.selectedImage.name);
    this.http.post('http://localhost:8000/api/profileUpload', fd).subscribe(
      data=>console.log(data)
    );
  }
  constructor(private myServ:AllServicesService,
              private http:HttpClient,
              private _snackBar:MatSnackBar) { }

}
