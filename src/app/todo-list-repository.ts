import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {randomDelayInMs} from "@SRC/app/delay";

export interface TodoListItem {
  title: string;
  description: string;
}


@Injectable({
  providedIn: 'root',
})
export class TodoListRepository {

  private _items: TodoListItem[] = [
    {
      title: 'Title 1',
      description: 'Item 1 description',
    },
    {
      title: 'Title 2',
      description: 'Item 2 description',
    },
  ]

  getItems(): Observable<TodoListItem[]> {
    return new Observable<TodoListItem[]>(subscriber => {
      setTimeout(() => {
        subscriber.next(this._items);
        subscriber.complete();
      }, randomDelayInMs());
    });
  }
}







