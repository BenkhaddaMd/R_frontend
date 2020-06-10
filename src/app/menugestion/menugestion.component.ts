import { Component, OnInit } from '@angular/core';
import { AllServicesService } from '../all-services.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

export class Category{
  name: string; 
  description: string;
}
export class Plat{
  name: null;
  description: null;
  categorie: null;
  prix: null;
  image: null;
};
@Component({
  selector: 'app-menugestion',
  templateUrl: './menugestion.component.html',
  styleUrls: ['./menugestion.component.css']
})
export class MenugestionComponent implements OnInit {
  category = {
    name: null,
    description: null
};
plat = {
  name: null,
  description: null,
  categorie: null,
  prix: null,
  image: null
};
allCategories : Category[] = [];
selectedImage:File = null;


onSubmitCategory(){
  this.myServ.createCategory(this.category).subscribe(
    data=>{
      this.category = new Category();
      this._snackBar.open("Votre categorie a été bien ajouté","OK", {
        duration: 5000,
      })
    },
   error => console.error(error)
 );
   
}
onSubmitPlat(){
  this.myServ.createPlat(this.plat).subscribe(
   data => {
     this.onUpload();
     this.plat = new Plat();
     this._snackBar.open("Votre plat a été bien ajouté","OK", {
       duration: 5000,
     })
    },
   error => console.error(error)
 )
}
onImagesSelected(event){
  this.selectedImage = <File>event.target.files[0];
  this.plat.image = this.selectedImage.name;

}

onUpload(){
  const fd = new FormData();
  fd.append('image', this.selectedImage, this.selectedImage.name);
  this.http.post('http://localhost:8000/api/imageUpload', fd).subscribe(
    data=>console.log(data)
  );
}

  constructor(private myServ:AllServicesService,
    private http:HttpClient,
    private router:Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.myServ.getCategories().subscribe(
      (data:Category[]) =>   {
        this.allCategories = data;
      },
      error => console.error(error)
      );
  }

}
