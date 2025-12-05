import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IPost } from '../../models';
import { Subject, takeUntil } from 'rxjs';
import { ItemComponent } from '../item/item.component';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  imports: [ItemComponent, CommonModule, FormComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  service = inject(ApiService);

  handleDelete(id: number) {
    this.service.deletePost(id);
  }
  handleEdit(data: IPost) {
    this.service.setEdit(true, data);
  }
  ngOnInit(): void {
    this.service.getPosts();
  }
  ngOnDestroy(): void {
    this.service.destroy$.next();
    this.service.destroy$.complete();
  }
}
