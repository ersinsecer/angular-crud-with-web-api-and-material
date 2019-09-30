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

  constructor(private productService: ProductService, private dialog: MatDialog, private eventEmitterService: EventEmitterService) { }

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
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
