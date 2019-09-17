import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    @Inject('apiUrl') private apiUrl,  // module.ts provider daki apiUrl tanımlıyoruz.

    private http: HttpClient) { }

    categories = [
      { id:1, value: "Kategori 1"},
      { id:2, value: "Kategori 2"},
      { id:3, value: "Kategori 3"}
    ];
    
  form: FormGroup = new FormGroup({
      $key: new FormControl(null),
      name: new FormControl('', Validators.required),
      //mail: new FormControl('', Validators.email),
      //mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
      description: new FormControl(''),
      price: new FormControl(''),
      category: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      name: '',
      description: '',
      price: '',
      category: ''
    });
  }


  getAllProducts()
  {
    return this.http.get<Product[]>(this.apiUrl + '/products');
  }
  
  addProduct(obj)
  {
    return this.http.post(this.apiUrl + '/products', obj);
  }

  updateProduct(obj)
  {
    return this.http.put(this.apiUrl + '/products', obj);
  }

  deleteProduct(id)
  {
    return this.http.delete(this.apiUrl + '/products', id);
  }
}
