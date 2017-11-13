import { Injectable } from '@angular/core';
import { Category } from 'app/interfaces/category';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CategoryService {

  CATEGORY_SRV: string = 'http://localhost:8181/category/add';

  constructor(private http:Http) { 

  }

  registrarCategoria(newCtgry:Category) {
    console.log('Ejecutando Service.....');
    
    let cuerpo = JSON.stringify(newCtgry);
    let customHeaders = new Headers({
      'Content-Type': 'application/json'
    });
    // post = (url , body , headers)
    // El mapa toco importarlo de: import 'rxjs/Rx';
    return this.http.post(this.CATEGORY_SRV, cuerpo, { headers: customHeaders }).map(res => {
      return res.json();
    });


  }

}
