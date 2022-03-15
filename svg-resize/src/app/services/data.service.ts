import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private baseUrl = 'http://localhost:3000/rectangle'
  constructor(private http: HttpClient) { }

  getRectangleData(){
    return this.http.get(`${this.baseUrl}`);
  }

  updateRectangleData(data: any){
    const url = `${this.baseUrl}/${data.id}`
    return this.http.put(`${url}`, data);
  }
}
