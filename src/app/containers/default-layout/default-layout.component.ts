import {Component} from '@angular/core';
import { AuthService } from '../../auth.service';
import { TokenService } from '../../token.service';
import { Router } from '@angular/router';
import { profile } from '../../profile/profile.component';
import { AllServicesService } from '../../all-services.service';
import { INavData } from '@coreui/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  public sidebarMinimized = false;
  public urlImage = '';
  public profile : profile = {name:'',email:'',fonction:'',image:''};
  constructor(private auth:AuthService,
              private token:TokenService,
              private router:Router,
              private myServ:AllServicesService,){}
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout(){
    this.auth.changeAuthStatus(false);
    this.token.logout();
    this.router.navigateByUrl("/login")
  }
  ngOnInit(): void {

    let email = atob(localStorage.getItem('email'));
    this.myServ.profile(email).subscribe(
      (data:profile)=> {
        this.profile = data;
        this.urlImage = `assets/img/avatars/`+this.profile.image;  
      //  if(data.fonction == "Admin") this.navItems_0[4].attributes = {hidden : true};

         if(data.fonction == "Caissier") {
           this.navItems_0[1].attributes = {hidden : true};
           this.navItems_0[2].attributes = {hidden : true};
           this.navItems_0[3].attributes = {hidden : true};
           this.navItems_0[6].attributes = {hidden : true};
          }

         if(data.fonction == "Comptoiriste")  {
          this.navItems_0[1].attributes = {hidden : true};
          this.navItems_0[2].attributes = {hidden : true};
          this.navItems_0[3].attributes = {hidden : true};
          this.navItems_0[4].attributes = {hidden : true};
          this.navItems_0[6].attributes = {hidden : true};
         }

         if(data.fonction == "Serveur")  {
          this.navItems_0[1].attributes = {hidden : true};
          this.navItems_0[2].attributes = {hidden : true};
          this.navItems_0[3].attributes = {hidden : true};
          this.navItems_0[6].attributes = {hidden : true};
         }

         this.navItems=this.navItems_0   
      }
    )

  }

  public menu:boolean;
  public navItems: INavData[] = []
  public navItems_0: INavData[] = [
   {
     name: 'Home',
     url: '/home',
     icon: 'icon-home',
   },
   {
     name: 'Menu Admin',
     url: '/menu',
     icon: 'icon-list',
   },
   {
    name: 'Menu Serveur',
    url: '/menuServeur',
    icon: 'icon-list',
  },
   {
     name: 'Employees',
     url: '/employees',
     icon: 'icon-people',
   },
   {
     name: 'Taches Comptoiriste',
     url: '/taches',
     icon: 'icon-note',
   },
   {
     name: 'Profile',
     url: '/profile',
     icon: 'icon-user',
   },
   {
     name: 'Ajouter Employée',
     url: '/register',
     icon: 'icon-plus'
   },
   {
    name: 'Gestion Menu',
    url: '/menugestion',
    icon: 'icon-equalizer',
  },
  {
    name: 'Taches Caissier',
    url: '/tachesCaissier',
    icon: 'icon-note',
  },
  
 ];
}
