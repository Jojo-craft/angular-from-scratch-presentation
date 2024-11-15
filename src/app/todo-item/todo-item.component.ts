import {Component, effect, EventEmitter, input, Input, OnInit, output, Output, untracked} from '@angular/core';
import {TodoListItem} from "@SRC/app/todo-list-repository";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="_form" (ngSubmit)="onSubmit()" class="form">
      <label>{{ item().title }}</label>

      <label for="description">Description</label>
      <input formControlName="description">

      <button type="submit" [disabled]="!_form.valid">Save</button>
    </form>
  `,
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  // @Input() item! : EventEmitter<TodoListItem> = new EventEmitter();
  item = input.required<TodoListItem>();

  // @Output() saveEvent: EventEmitter<TodoListItem> = new EventEmitter();
  saveEvent = output<TodoListItem>();

  _form = new FormGroup({
    description: new FormControl<string>('', [Validators.required, Validators.maxLength(20)]),
  })

  constructor() {
    effect((): void => {
      const item = this.item();

      untracked(() => {
        //
        this._form.setValue({
          description: item.description,
        })
      });
    });
  }

  // ngOnInit(): void {
  //   this._form.setValue({
  //     description: this.item().description,
  //   })
  // }

  onSubmit(): void {
    console.log('save');

    if (!this._form.value.description) {
      console.log('erreur');
      return;
    }

    this.saveEvent.emit({
      title: this.item().title,
      description: this._form.value.description
    });
  }
}
