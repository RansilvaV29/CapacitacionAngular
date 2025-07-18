import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../servcies/producto.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-editar',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatLabel,
    MatFormFieldModule,
    ReactiveFormsModule

  ],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{

  productoForm: FormGroup;
  productoId: number | null = null;
  cargando = false;


  constructor(
    private route: ActivatedRoute,
    private productoService : ProductoService,
    private fb: FormBuilder,
    private router: Router
  ){
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    })
  }

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.productoId){
      this.cargando = true;
      this.productoService.productoPorId(this.productoId).subscribe({
        next: (producto) => {
          this.productoForm.patchValue(producto);
          this.cargando = false;
        },
        error: (err) =>
        {
          console.error('error al obtener el producto: ', err);
          this.cargando =false;
        }
      })
    }
  }

  guardar():void{
    if(this.productoForm.valid && this.productoId){
      this.productoService.editarProducto(this.productoForm.value, this.productoId).subscribe({
        next: () => {
          this.router.navigate(['/lista']);
        },
        error: err => {
          console.error('error actualizando el producto', err);
        }
      })
    }
  }

  navegarInicio(){
    this.router.navigate(['/lista'])
  }
}
