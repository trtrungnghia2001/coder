import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { IProduct } from '../../models/interface';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  dataList: IProduct[] = [];
  destroy$ = new Subject<void>();
  // FormGroup để quản lý trạng thái của form
  productForm!: FormGroup;

  isLoading: boolean = false;

  constructor(private api: ApiService, private fb: FormBuilder) {}

  create() {
    this.isLoading = true;
    if (this.productForm.valid) {
      this.api
        .createProduct(this.productForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (value) => {
            this.dataList = [...this.dataList, value];
          },
          (error) => {
            console.error(error);
          },
          () => {
            this.isLoading = false;
          }
        );
    }
  }
  getAll() {
    this.isLoading = true;
    this.api
      .getProduct()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (value) => {
          this.dataList = value;
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.isLoading = false;
        }
      );
  }
  delete(id: string) {
    this.isLoading = true;
    this.api
      .deleteProduct(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (value) => {
          this.dataList = this.dataList.filter((item) => item._id !== id);
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.isLoading = false;
        }
      );
  }
  favorite(id: string) {
    this.isLoading = true;
    this.api
      .favoriteProduct(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (value) => {
          this.dataList = this.dataList.map((item) =>
            item._id === id ? { ...item, isFavorite: !item.isFavorite } : item
          );
        },
        (error) => {
          console.error(error);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  ngOnInit(): void {
    this.getAll();
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      price: [0, [Validators.required, Validators.min(1)]], // Giá phải lớn hơn 0
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
