import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from '../../models';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @Input() data!: IPost;
  @Output() deleteEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();

  onDeleteClick() {
    this.deleteEvent.emit(this.data.id);
  }
  onEditClick() {
    this.editEvent.emit(this.data);
  }
}
