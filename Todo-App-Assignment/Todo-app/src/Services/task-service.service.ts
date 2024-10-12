import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  baseUrl : string = 'http://localhost:3000/';
  constructor(private http : HttpClient) { }

  addNewTask(data : any) : Observable<any>{
    return this.http.post(`${this.baseUrl}tasks`, data);
  }

  getData(): Observable<any>{
    return this.http.get(`${this.baseUrl}tasks`);
  }

  editData(id : any , data : any) : Observable<any>{
    return this.http.put(`${this.baseUrl}tasks/${id}`, data)
  }

  deleteTask(id : any) : Observable<any>{
    return this.http.delete(`${this.baseUrl}tasks/${id}`);
  }

}
