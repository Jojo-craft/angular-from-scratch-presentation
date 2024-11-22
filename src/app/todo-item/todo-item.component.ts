import {Component, effect, input, output, untracked} from '@angular/core';
import {TodoListItem} from "@SRC/app/todo-list-repository";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
      <h4>{{ item().title }}</h4>

      <label for="description">Description</label>
      <input formControlName="description">

      <button type="submit" [disabled]="!form.valid">Save</button>
    </form>
  `,
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  // @Input() item! : EventEmitter<TodoListItem> = new EventEmitter();
  item = input.required<TodoListItem>();

  // @Output() saveEvent: EventEmitter<TodoListItem> = new EventEmitter();
  saveEvent = output<TodoListItem>();

  form = new FormGroup({
    description: new FormControl<string>('', [Validators.required, Validators.maxLength(20)]),
  })

  constructor() {
    effect((): void => {
      const item = this.item();

      untracked(() => {
        // effect() ne sera pas déclenché si un autre signal est utilisé dans ce scope et que ce signal change
        this.form.setValue({
          description: item.description,
        })
      });
    });
  }

  onSubmit(): void {
    console.log('save');

    if (!this.form.value.description) {
      console.log('erreur');
      return;
    }

    this.saveEvent.emit({
      title: this.item().title,
      description: this.form.value.description
    });
  }
}
