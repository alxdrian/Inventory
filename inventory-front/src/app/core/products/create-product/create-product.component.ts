import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  title = 'Create Product';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productService: ProductService,
    private aRouter: ActivatedRoute

    ) { 
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.isEditPage();
  }

  saveProduct() {
    const PRODUCT: Product = {
      name: this.productForm.get('name')?.value,
      category: this.productForm.get('category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value,
      quantity: this.productForm.get('quantity')?.value,
    };

    if (this.id != null) {
      // edit product
      this._productService.updateProduct(this.id, PRODUCT).subscribe(
        data => {
          this.toastr.info('The product was successfully updated!', 'Updated product!');
          this.router.navigate(['/products']);
        },
        error => {
          console.log(error);
          this.toastr.error('The product was not updated!', 'Error!');
        }
      )
    } else {
      // create product
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

  isEditPage() {
    if (this.id != null) {
      this.title = 'Edit Product';
      this._productService.getProductById(this.id).subscribe(
        data => {
          this.productForm.patchValue({
            name: data.name,
            category: data.category,
            location: data.location,
            price: data.price,
            quantity: data.quantity,
          });
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}
