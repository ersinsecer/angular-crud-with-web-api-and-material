import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  //products: [Product];
  constructor(private productService: ProductService, private homeComponent: HomeComponent,
    public dialogRef: MatDialogRef<AddProductComponent>) { }

  ngOnInit() {
    this.refreshData();
  }

  private refreshData() {
    this.productService.getAllProducts().subscribe(res => {
      this.homeComponent.products = res['products'];
      console.log(this.homeComponent.products);
    });
  }

  onSubmit(form: NgForm) {
    if (form.value.Id == null)
      this.insertRecord(form);
    // else
    //   this.updateRecord(form);
  }
  
  insertRecord(form: NgForm) {
    this.productService.addProduct(form.value).subscribe(res => {
      // this.toastr.success('Inserted successfully', 'EMP. Register');
      // this.resetForm(form);
      this.refreshData();
      this.onClose();
    });
  }
  
  onClear() {
    this.productService.form.reset();
    this.productService.initializeFormGroup();
    
  }

  onClose() {
    this.productService.form.reset();
    this.productService.initializeFormGroup();
    this.dialogRef.close();
  }

}
