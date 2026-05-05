import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../../types/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // Pointing to local json-server
  private dataUrl = 'http://localhost:3000/departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.dataUrl);
  }

  addDepartment(department: Department): Observable<Department> {
    // In a real application, this would be a POST request to a backend API
    // For now, we simulate the API call
    console.log('API Call: POST', this.dataUrl, department);
    return this.http.post<Department>(this.dataUrl, department);
  }

  updateDepartment(department: Department): Observable<Department> {
    // In a real application, this would be a PUT request to a backend API
    // For now, we simulate the API call
    const url = `${this.dataUrl}/${department.id}`;
    console.log('API Call: PUT', url, department);
    return this.http.put<Department>(url, department);
  }
}
