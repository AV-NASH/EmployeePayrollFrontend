import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  createEmployee(data){
    console.log("in the service",data);
    return this.http.post('http://localhost:9090/employee-payroll/create/',data);

  }
}
