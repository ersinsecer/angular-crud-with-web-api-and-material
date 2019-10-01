import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Injectable()
export class ProductService {

  constructor(
    @Inject('apiUrl') private apiUrl,  // module.ts provider daki apiUrl tanımlıyoruz.
    private http: HttpClient) { }

    productList: Observable<Product[]>;

    categories = [
      { id:1, value: "Kategori 1"},
      { id:2, value: "Kategori 2"},
      { id:3, value: "Kategori 3"}
    ];
    
  form: FormGroup = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      //mail: new FormControl('', Validators.email),
      //mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
      description: new FormControl(''),
      price: new FormControl(''),
      category: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: 0,
      name: '',
      description: '',
      price: '',
      category: 0
    });
  }

  getAllProducts(): Observable<Product[]> 
  {
    return this.http.get<Product[]>(this.apiUrl + '/products');
  }
    
  // POST
  addProduct(data): Observable<Product> {
    return this.http.post<Product>(this.apiUrl + '/products/', data);
  }

  updateProduct(obj): Observable<Product>
  {
    return this.http.put<Product>(this.apiUrl + '/products', obj);
  }

  deleteProduct(id)
  {
    return this.http.delete(this.apiUrl + '/products/'+ id);
  }

  populateForm(employee) {
    this.form.patchValue(_.omit(employee,'categoryId'));
  }

}
