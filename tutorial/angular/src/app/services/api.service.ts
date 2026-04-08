import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../models';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = `https://jsonplaceholder.typicode.com`;
  constructor(private http: HttpClient) {}

  data: IPost[] = [];

  //
  isEdit$ = new BehaviorSubject<{
    isEdit: boolean;
    dataEdit: IPost | null;
  }>({
    isEdit: false,
    dataEdit: null,
  });

  dataEdit: IPost | null = null;
  setEdit(is: boolean, data: IPost | null) {
    this.isEdit$.next({
      isEdit: is,
      dataEdit: data,
    });
  }

  isLoading: boolean = false;
  destroy$ = new Subject<void>();

  getPosts() {
    this.isLoading = true;
    this.http
      .get<IPost[]>(this.baseUrl + `/posts`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.data = value;
        this.isLoading = false;
      });
  }
  createPost(data: Partial<IPost>) {
    this.isLoading = true;
    this.http
      .post<IPost>(this.baseUrl + `/posts`, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.data = [value, ...this.data];
        this.isLoading = false;
      });
  }
  updatePost(id: number, data: Partial<IPost>) {
    this.isLoading = true;
    this.http
      .put<IPost>(this.baseUrl + `/posts/` + id, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.data = this.data.map((item) =>
          item.id === id ? { ...item, ...value } : item
        );
        this.isLoading = false;
      });
  }
  deletePost(id: number) {
    this.isLoading = true;
    this.http
      .delete<IPost>(this.baseUrl + `/posts/` + id)
      .subscribe((value) => {
        this.data = this.data.filter((item) => item.id !== id);
        this.isLoading = false;
      });
  }
}
