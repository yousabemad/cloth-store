import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { Product, Products } from '../../modules/types';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productService: ProductsService) {}

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  displayAddPopup: boolean = false;
  displayEditPopup: boolean = false;
  selectProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };


toggleEditPopup(product:Product){
  this.selectProduct = product;
  this.displayEditPopup=!this.displayEditPopup;
}

toggleDeletePopup(product:Product){

}

toggleAddPopup(){
  this.displayAddPopup=true;
}


  onConfirmEdite(product: Product) {
    if (!this.selectProduct.id) {
      return;
    }
    this.editProduct(product, this.selectProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          console.log(data);
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.productService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchProducts(0, this.rows);
  }
}
