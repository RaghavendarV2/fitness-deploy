import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Profile } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = "http://172.24.60.170:2001/api/users"
  constructor(private http:HttpClient) { }

  viewProfileById(id : number): Observable<Profile>{
    return this.http.get<Profile>(`${this.baseUrl}/profile/${id}`);
  }

  editProfileByUserId(uId : number, updatedProfile : Profile) : Observable<Profile>{
    return this.http.put<Profile>(`${this.baseUrl}/profile/${uId}`, updatedProfile)
  }

  
}
