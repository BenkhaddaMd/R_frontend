import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {

  constructor(private http:HttpClient) { }
  private url = "http://localhost:8000/api";
  registre(data){
    return this.http.post(`${this.url}/registre`,  {
      name:data.username,
      email:data.email,
      fonction:data.fonction,
      password:data.password,
      password_confirmation:data.r_password,
      image:data.image
      })
  }
  login(data){
    return this.http.post(`${this.url}/login`, data)
  }
  profile(email){
    return this.http.get(`${this.url}/profile/${email}`)
  }
  createCategory(data){
    return this.http.post(`${this.url}/addCategory`, data);
  }
  createPlat(data){
    return this.http.post(`${this.url}/addPlat`, data);
  }
  getCategories(){
    return this.http.get(`${this.url}/getCategorise`);
  }
  getPlats(){
    return this.http.get(`${this.url}/getPlats`);
  }
  getEmployees(){
    return this.http.get(`${this.url}/getEmployees`);
  }
  createCommande(data){
    return this.http.post(`${this.url}/createCommande`, data);
  }
  createLineOfCommande(data){
    return this.http.post(`${this.url}/createLineOfCommande`, data);
  }
  deletePlat(id){
    return this.http.get(`${this.url}/deletePlat/${id}`);
  }
}
