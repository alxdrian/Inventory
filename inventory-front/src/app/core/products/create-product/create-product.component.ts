import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productService: ProductService,

    ) { 
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  saveProduct() {
    const PRODUCT: Product = {
      name: this.productForm.get('name')?.value,
      category: this.productForm.get('category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value,
      quantity: this.productForm.get('quantity')?.value,
    };

    console.log(PRODUCT);
    this._productService.saveProduct(PRODUCT).subscribe(
      data => {
        this.toastr.success('The product was successfully created!', 'Created product!');
        this.router.navigate(['/products']);
      },
      error => {
        console.log(error);
        this.toastr.error('The product was not created!', 'Error!');
      }
    )
  }
}
