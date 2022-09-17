import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL = "http://localhost:3001/products"

  constructor(private sanckBar: MatSnackBar, private http: HttpClient ) { }

  showWarning (msg: string, isError: boolean = false) {
    this.sanckBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseURL, product).pipe(
      map(obj => obj), 
      catchError((e) => this.errorHandler(e))
    )
  }

  
  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseURL).pipe(
      map(obj => obj), 
      catchError((e) => this.errorHandler(e))
      )
    }
    
    readById(id: number): Observable<Product> {
      const url = `${this.baseURL}/${id}`
    return this.http.get<Product>(url).pipe(
      map(obj => obj), 
      catchError((e) => this.errorHandler(e))
      )
    }
    
    update(product: Product): Observable<Product> {
      const url = `${this.baseURL}/${product.id}`
      return this.http.put<Product>(url,product).pipe(
        map(obj => obj), 
        catchError((e) => this.errorHandler(e))
        )
      }

  delete(id: number): Observable<Product> {
    const url = `${this.baseURL}/${id}`
    return this.http.delete<Product>(url).pipe(
      map(obj => obj), 
      catchError((e) => this.errorHandler(e))
      )
  }
  
  errorHandler(e: any): Observable<any> {
    this.showWarning('Ocorreu um erro!', true)
    return EMPTY
  }
}
