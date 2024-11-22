import {DestroyRef, inject, Injectable, signal} from "@angular/core";
import {TodoListItem, TodoListRepository} from "@SRC/app/todo-list-repository";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {finalize} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TodoListFacade {

  isLoading = signal(false);
  todoItems = signal<TodoListItem[]>([]);

  private _destroyRef = inject(DestroyRef);
  private _repository: TodoListRepository = inject(TodoListRepository);

  loadTodoItems(): void {
    this.isLoading.set(true);

    this._repository.getItems()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe({
        next: (items: TodoListItem[]) => {
          this.todoItems.set(items);
        },
        error: () => {
          // Gestion des erreurs ici
        },
      });
  }
}
