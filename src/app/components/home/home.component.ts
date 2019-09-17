import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dialogValue:string; 
  sendValue:string;

  products : Product[];
  constructor(private productService: ProductService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllProducts();
   } 

  getAllProducts() {
    this.productService.getAllProducts().subscribe(res => {
      this.products = res['products'];
      console.log(this.products);
    });
  }
 
   onCreate() {
    this.productService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddProductComponent,dialogConfig);
  }
}
