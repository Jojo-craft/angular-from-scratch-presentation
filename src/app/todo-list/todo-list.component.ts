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
    <div>
      {{ count() }}
      <button (click)="onClick()">++</button>
      {{ doubleCount() }}
    </div>

    @if (isLoading()) {
      LOADING...
    } @else {
      @for (item of _items; track item.title) {
        <li>
          <app-todo-item [item]="item" (saveEvent)="onSave($event)" />
        </li>
      }
    }
  `,
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  count = signal(0);

  doubleCount: Signal<number> = computed(() => {
    return this.count() * 2;
  });




  isLoading = signal(false);

  private _repository: TodoListRepository = inject(TodoListRepository);

  _items: TodoListItem[];

  constructor() {
    this._items = [];
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
          this._items = items;
        },
        error: () => {
          // TODO : gestion error
        },
      });
  }

  onSave($event: TodoListItem) {
    console.log('Update todo item : ', $event);
  }

  onClick(): void {
    this.count.update((value) => value + 1)
  }
}
