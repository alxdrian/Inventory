import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  productsList: Product[] = [];

  constructor(
    private _productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      data => {
        console.log(data);
        this.productsList = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteProduct(id: any) {
    this._productService.deleteProduct(id).subscribe(
      data => {
        this.toastr.success('The product was successfully deleted!', 'Deleted product!');
        this.getProducts();
      },
      error => {
        console.log(error);
        this.toastr.error('The product was not deleted!', 'Error!');
      }
    )
  }

}

