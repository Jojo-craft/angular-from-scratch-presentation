import {Component, computed, Signal, signal} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <h3>Home</h3>

    <div>
      {{ count() }}
      <button (click)="onClick()">++</button>
      {{ doubleCount() }}
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  count = signal(0);

  doubleCount: Signal<number> = computed(() => {
    return this.count() * 2;
  });

  onClick(): void {
    this.count.update((value) => value + 1)
  }
}
