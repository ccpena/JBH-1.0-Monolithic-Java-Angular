import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , NgForm } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from 'app/interfaces/category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  formCreateCtgry: FormGroup;

  // Form Controls
  nameFCtrl: FormControl;
  typeFCtrl: FormControl;

  newCtgry: Category = {
    name: '' ,
    type: ''
  };

  showMsg: boolean;
  

  constructor(private srvCategory:CategoryService) { 
    this.nameFCtrl = new FormControl();
    this.typeFCtrl = new FormControl();

    this.formCreateCtgry = new FormGroup({
      'name': this.nameFCtrl,
      'typeCtgry': this.typeFCtrl
    });

    // Asignar Validadores
    this.nameFCtrl.setValidators([Validators.required, Validators.maxLength(10)]);
    this.typeFCtrl.setValidators(Validators.required);

  }

  ngOnInit() {
  }

  registrarCategoria() {    
    this.newCtgry.name = this.nameFCtrl.value;
    this.newCtgry.type = this.typeFCtrl.value;
    this.srvCategory.registrarCategoria(this.newCtgry).subscribe( respuesta => {
      this.showMsg = true;
      setTimeout(() => {
        this.showMsg = false;
      }, 3000);
    });

    console.log(this.formCreateCtgry);
    this.formCreateCtgry.reset();
  }

}
