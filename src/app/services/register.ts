import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http : HttpClient) { }

  private baseUrl = "http://172.24.60.170:2001/api/users"

  registerUser(user : User) : Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/register`,user);
  }

  tryToLogin(user : User) : Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/login`, user);
  }


}
