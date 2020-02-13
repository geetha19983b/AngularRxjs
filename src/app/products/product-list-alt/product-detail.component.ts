import { Component } from '@angular/core';

import { ProductService } from '../product.service';
import { catchError,map } from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { Product } from '../product';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  
  product$ = this.productService.selectedProduct$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

    pageTitle$ = this.product$
    .pipe(
      map((p: Product) =>
        p ? `Product Detail for: ${p.productName}` : null)
    );

    productSuppliers$ = this.productService.selectedProductSuppliers$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      }));


  constructor(private productService: ProductService) { }

}
