import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {



  constructor(private productService: ProductService, 
    public dialogRef: MatDialogRef<AddProductComponent>, 
    private route:Router,
    private eventEmitterService : EventEmitterService) {     
  }

  ngOnInit() {
    this.RefreshData();
  }

  private RefreshData() {
    this.productService.getAllProducts();
  }

  onSubmit(form: NgForm) {
    if (!form.value.id)
    {
      this.productService.addProduct(this.productService.form.value).subscribe(res => {
        this.eventEmitterService.onHomeComponentFunction();
      });
    }
    else
      this.productService.updateProduct(this.productService.form.value).subscribe(res => {
        this.eventEmitterService.onHomeComponentFunction();
      });    
      this.onClose();
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
