import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import 'hammerjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  

  constructor(private productService: ProductService, private dialog: MatDialog, 
    private eventEmitterService: EventEmitterService) { }

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'actions'];
  dataSource : MatTableDataSource<any>;
  
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  
  ngOnInit() {
    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe((name:string) => {    
        this.RefreshData();    
      });    
    }    
    this.RefreshData();   
  }  

  RefreshData() {
    this.productService.getAllProducts().subscribe(res => {
      this.dataSource = new MatTableDataSource(res['products']);
      this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }

  onCreate() {
    this.productService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddProductComponent,dialogConfig);
  }

  onEdit(row){
    this.productService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AddProductComponent,dialogConfig);
  }

  onDelete(id){
    if(confirm('Kayıt silinecek!')){
    this.productService.deleteProduct(id).subscribe(res =>{
      this.eventEmitterService.onHomeComponentFunction();
    });
    }
  }
}

