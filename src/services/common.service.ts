import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _http: HttpClient) { }

  createUser(user:any){
    return this._http.post("http://localhost:3000/users",user);
  }

  updateUser(id:number,user:any){
    console.log(user.id,user);
    
    return this._http.put("http://localhost:3000/users/"+id,user);
  }

  getCurrentUser(){
    return this._http.get("http://localhost:3000/users");

  }

  deleteUser(){

  }
}
