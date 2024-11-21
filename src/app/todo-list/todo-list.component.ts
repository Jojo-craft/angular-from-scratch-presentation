import {Component, computed, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {TodoListItem, TodoListRepository} from "@SRC/app/todo-list-repository";
import {TodoItemComponent} from "@SRC/app/todo-item/todo-item.component";
import {finalize} from "rxjs";

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
      @for (item of items; track item.title) {
        <app-todo-item [item]="item" (saveEvent)="onSave($event)"/>
      }
    }
  `,
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  isLoading = signal(false);
  items: TodoListItem[];

  private _repository: TodoListRepository = inject(TodoListRepository);


  constructor() {
    this.items = [];
  }

  ngOnInit(): void {
    this.isLoading.set(true);

    this._repository.getItems()
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (items: TodoListItem[]) => {
          this.items = items;
        },
        error: () => {
          // Gestion des erreurs ici
        },
      });
  }

  onSave($event: TodoListItem) {
    console.log('Update todo item : ', $event);
  }
}
