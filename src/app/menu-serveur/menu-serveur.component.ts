import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AllServicesService } from '../all-services.service';
import { Category } from '../menugestion/menugestion.component';
import {MatDialog} from '@angular/material/dialog';
import { CommandeDetailsComponent } from '../commande-details/commande-details.component';
import {MatSnackBar} from '@angular/material/snack-bar';

export class LineOfCommande{
  idPlat:number;
  idCommande:number;
  quantity:number;
  Prix:number;
}
export class Commande{
  numero_table:number;
  total:number;
  status:string;
  commente:string;
}
export class Plat{
  id:null;
  name: null;
  description: null;
  categorie: null;
  prix: number;
  image: null;
};
export interface changeInfo{
  numero_table:number;
  commente:string;
  error:string;
}
@Component({
  selector: 'app-menu-serveur',
  templateUrl: './menu-serveur.component.html',
  styleUrls: ['./menu-serveur.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuServeurComponent implements OnInit {
  numero_table:number = null;
  commente:string = null;
  error:string = null;
  constructor(private myServ:AllServicesService, public dialog: MatDialog,public _snackBar:MatSnackBar) { }

  public categorise:Category[] = [{name: "Tous",description: ''}];
  public plats:Plat[] = [];
  public commande:Commande = new Commande();
  public lines0fCommande:LineOfCommande[] = [];
  public lines0fCommandeNotYet:LineOfCommande[] = [];

  public commandeReady:boolean = false;

  createLine(plat:Plat,quantity){
    let test = 1;
    for(let line of this.lines0fCommandeNotYet){
      if(line.idPlat==plat.id){
          line.quantity = quantity;         
          test = 0;
      }
    }
    if(test)
    this.lines0fCommandeNotYet.push({
                                idPlat:plat.id,
                                idCommande:null,
                                quantity:quantity,
                                Prix:plat.prix
                              });    
  }
  removeCommande(){
    this.commande = new Commande();
    this.lines0fCommande = [];
    this.lines0fCommandeNotYet = [];
    this.commandeReady = false;
  }
  buy(id, plat:Plat){
    let test = 1,i = 0;
    this.commandeReady = true;
    for(let line of this.lines0fCommandeNotYet){
      if(line.idPlat==plat.id){
          this.lines0fCommande.push({
          idPlat:line.idPlat,
          idCommande:null,
          quantity:line.quantity,
          Prix:line.Prix
        }); 
        this.lines0fCommandeNotYet.splice(i,1);
        test = 0;
      }
      i++;
    }
    if(test){
      this.lines0fCommande.push({
        idPlat:plat.id,
        idCommande:null,
        quantity:1,
        Prix:plat.prix
      }); 
    }
  
    document.getElementsByClassName("bottom")[id].classList.toggle("clicked");
    setTimeout(() => {
      this.remove(id); 
      }, 3000);
  
      var inputValue = (<HTMLInputElement>document.getElementsByName("quantity")[id]).value="1";
  }
  remove(id){
    document.getElementsByClassName("bottom")[id].classList.remove("clicked");
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommandeDetailsComponent, {
      width: '445px',
      data: {numero_table: this.numero_table, commente: this.commente,error:this.error}});

    dialogRef.afterClosed().subscribe((result:changeInfo) => {
      this.createCommande(result);
    });
  }
  createCommande(result){
    if(result){
      this.commande.numero_table = result.numero_table;
      this.commande.commente = result.commente;
      this.commande.status = "en attente"
      this.commande.total = 0;
      for(let lineOfcommande of this.lines0fCommande){
        this.commande.total = this.commande.total + lineOfcommande.Prix*lineOfcommande.quantity;
      }
      this.myServ.createCommande(this.commande).subscribe(
        (data:number)=> {
          this.createLineOfCommande(data);
          this._snackBar.open("Votre commande a été bien passer","OK", {
            duration: 5000,
          });
        },
        error => {
          this.error = (error.error.error != undefined) ? error.error.error + " ,Choisir une autre" : "S'il vous plait entrez vos informations";
          this.openDialog();
        }
      );

    }
  }
  createLineOfCommande(data){
    for(let lineOfcommande of this.lines0fCommande) {
      lineOfcommande.idCommande = data;
      this.myServ.createLineOfCommande(lineOfcommande).subscribe(
        data => this.removeCommande(),
        error => console.error(error)
      );
    }    
    
  }

  ngOnInit(): void {
    this.myServ.getCategories().subscribe(
      (data:Category[]) => {
        for(let cat of data)
        this.categorise.push(cat);
      },
        error=> console.error(error)
    );
    this.myServ.getPlats().subscribe(
      (data:Plat[]) => this.plats = data,
      error=> console.error(error)
    );
  }

}
