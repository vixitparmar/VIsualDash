import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataItem } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class VisualDataService {
  data?: DataItem[];
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }
  
  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data)
  }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/data`);
  }

  sendData(data: DataItem[]): Observable<DataItem[]> {
    return this.http.post<DataItem[]>(`${this.apiUrl}/api/data`, data);
  }

  updatedata(id: string, data: DataItem[]): Observable<DataItem[]> {
    return this.http.put<DataItem[]>(`${this.apiUrl}/api/data/${id}`, data);
  }

  deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/data/${id}`);
  }
}
