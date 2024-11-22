import {Component, computed, inject, OnInit} from '@angular/core';
import {TodoListItem} from "@SRC/app/todo-list-repository";
import {TodoItemComponent} from "@SRC/app/todo-item/todo-item.component";
import {TodoListFacade} from "@SRC/app/todo-list-facade";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    TodoItemComponent
  ],
  template: `
    <h3>Todo list</h3>

    @if (isLoading()) {
      LOADING...
    } @else {
      @for (item of items(); track item.title) {
        <app-todo-item [item]="item" (saveEvent)="onSave($event)"/>
      } @empty {
        EMPTY !
      }
    }
  `,
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  isLoading = computed(() => {
    return this._facade.isLoading();
  });

  items = computed(() => {
    return this._facade.todoItems();
  });

  private _facade: TodoListFacade = inject(TodoListFacade);

  ngOnInit(): void {
    this._facade.loadTodoItems();
  }

  onSave($event: TodoListItem) {
    console.log('Update todo item : ', $event);
  }
}
