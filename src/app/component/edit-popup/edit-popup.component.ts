import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../modules/types';
import { FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBulider: FormBuilder) {}
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<Product>();
  @Input() header!: string;
  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

specialCharcterValidator(): ValidatorFn {
  return (control)=>{
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    control.value);
    return hasSpecialCharacter ? {hasSpecialCharacter: true} : null;
    }
}

  productForm= this.formBulider.group({
    name: ['',[Validators.required ,this.specialCharcterValidator() ]],
    image: [''],
    price: ['',[Validators.required, Validators.pattern('^[1-9]\\d*(\\.\\d)?')]], 
    rating: [0],
    });

    ngOnChanges(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.productForm.patchValue(this.product);
    }


  onConfirm() {
    const {name,image,price , rating } = this.productForm.value
    this.confirm.emit({
      name: name ||'',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
