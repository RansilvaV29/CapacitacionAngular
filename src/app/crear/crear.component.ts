import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../servcies/producto.service';

@Component({
  selector: 'app-crear',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatLabel,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {

  productoForm: FormGroup;

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

  guardar(): void{
    if(this.productoForm.valid){
      this.productoService.crearProducto(this.productoForm.value).subscribe({
        next: () =>{
          this.router.navigate(['/lista']);
        },
        error: err =>{
          console.error('error al crear el producto', err);
        }
      })
    }
  }

  navegarInicio(){
    this.router.navigate(['/lista'])
  }
}
