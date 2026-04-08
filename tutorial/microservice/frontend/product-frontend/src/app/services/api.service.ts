import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = `http://localhost:5000`;
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const getLocal = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (getLocal) {
      const token =
        JSON.parse(getLocal) ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDRmMTU3NmQxODMxMTFhYzkzNDk1OCIsImlhdCI6MTc0OTM3NjgyNywiZXhwIjoxNzQ5NDYzMjI3fQ.4oNy6yOANYdJpnKf07jc4b7V1gPuLwcVzw3J247SEao';
      headers = headers.set('Authorization', token);
    }
    return headers;
  }

  getProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl + `/products`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }
  createProduct(data: Partial<IProduct>): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl + `/products`, data, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }
  deleteProduct(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      this.baseUrl + `/products/${id}`,
      {
        headers: this.getAuthHeaders(),
        withCredentials: true,
      }
    );
  }
  favoriteProduct(id: string): Observable<IProduct> {
    return this.http.post<IProduct>(
      this.baseUrl + `/favorites`,
      {
        productId: id,
      },
      {
        headers: this.getAuthHeaders(),
        withCredentials: true,
      }
    );
  }
}
