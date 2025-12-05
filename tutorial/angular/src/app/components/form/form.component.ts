import { Component, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  service = inject(ApiService);
  postForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.service.isEdit$.subscribe((value) => {
      if (value.isEdit && value.dataEdit) {
        const { id, title, body } = value.dataEdit;
        this.postForm.patchValue({ id, title, body });
      }
    });
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.service.isEdit$.pipe(take(1)).subscribe((value) => {
        if (value.isEdit && value.dataEdit) {
          this.service.updatePost(value.dataEdit.id, this.postForm.value);
        } else {
          this.service.createPost(this.postForm.value);
        }
      });
      this.service.setEdit(false, null);
      this.postForm.reset();
    } else {
      alert('Vui lòng điền đầy đủ và đúng thông tin!');
    }
  }
}
