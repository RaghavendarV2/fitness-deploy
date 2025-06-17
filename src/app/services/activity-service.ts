import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity, Goal } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private baseUrl = "http://172.24.60.170:2002/api";
  constructor(private http:HttpClient) { }

  createActivity(activity : Activity) : Observable<Activity>{
    return this.http.post<Activity>(`${this.baseUrl}/activities`, activity);
  }

  getAllActivityByUser(uId : number) : Observable<Activity[]>{
    return this.http.get<Activity[]>(`${this.baseUrl}/user/${uId}`)
  }

  createGoalForUser(goal : Goal, uId : number) : Observable<Goal>{
    return this.http.post<Goal>(`${this.baseUrl}/goals/${uId}`, goal);
  }

  getAllGoalsByUser(uId : number) : Observable<Goal[]>{
    return this.http.get<Goal[]>(`${this.baseUrl}/goals/user/${uId}`);
  }
}
