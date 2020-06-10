import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { changeInfo } from '../menu-serveur/menu-serveur.component';

@Component({
  selector: 'app-commande-details',
  templateUrl: './commande-details.component.html',
  styleUrls: ['./commande-details.component.css']
})
export class CommandeDetailsComponent {

  constructor(
    public dialogRef: MatDialogRef<CommandeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: changeInfo) {}

  onNoClick(): void {    
    this.dialogRef.close();
  }

}
