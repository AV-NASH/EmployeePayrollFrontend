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

   getEmployeesList(){
    console.log("in service")
    return this.http.get('http://localhost:9090/employee-payroll/get');
  }

  getEmployee(id){
    return this.http.get('http://localhost:9090/employee-payroll/getbyid/?id='+id);
  }

  updateEmployee(data){
    return this.http.put('http://localhost:9090/employee-payroll/update/',data);

  }

   deleteEmployee(id){
    return this.http.delete('http://localhost:9090/employee-payroll/delete/'+id);
  }

}

