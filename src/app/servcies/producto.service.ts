import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interface/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:8080/api/v1/productos';

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.apiUrl);
  }

  eliminarProducto(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  editarProducto(producto: Producto, id: number): Observable<Producto>{
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }

  productoPorId(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.apiUrl}/${id}`)
  }
  
  crearProducto(producto: Producto): Observable<Producto>{
    return this.http.post<Producto>(`${this.apiUrl}`, producto);
  }

}
