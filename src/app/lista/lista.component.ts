import { Component, OnInit } from '@angular/core';
import { Producto } from '../interface/producto';
import { ProductoService } from '../servcies/producto.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-lista',
  imports: [
    MatCardModule,
    CommonModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'stock', 'acciones'];
  dataSource: Producto[] = [];


  constructor(
    private productoService: ProductoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productoService.obtenerProductos().subscribe((productos) =>{
      this.dataSource = productos;
    });
  }

  eliminarProducto(producto: Producto): void{
    if(!producto.id)return;
    this.productoService.eliminarProducto(producto.id).subscribe({
      next: ()=>{
        this.dataSource = this.dataSource.filter(p=>p.id !== producto.id);
      },
      error: (err) => {
        console.error('Error eliminado producto', err);
      }
    })
  }

  editarProducto(producto: Producto):void{
    if(!producto.id)return;
    this.router.navigate(['/editar', producto.id])
  }

  agregarProducto(): void{
    this.router.navigate(['/crear']);
  }

}
