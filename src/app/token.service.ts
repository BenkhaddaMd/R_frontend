import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  private iss = {
    login: 'http://localhost:8000/api/login',
    registre: 'http://localhost:8000/api/login'
  };
  handle(token){
    this.setToLocalStorage(token);
  }

  setToLocalStorage(token){
    localStorage.setItem('token', token);

  }
  getToken(){
    return localStorage.getItem('token');
  }
  removeToken(){
     localStorage.removeItem('token');
  }
  isValide(){
    const token = this.getToken();
    if(token){
      const payload = this.payload(token);
      if(payload){        
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }
  payload(token){
    return this.decode(token.split('.')[1]);
  }
  decode(payload){
    return JSON.parse(atob(payload))
  }

  loggedIn(){
    return this.isValide();
  }
  logout(){
    this.removeToken();
  }
}
