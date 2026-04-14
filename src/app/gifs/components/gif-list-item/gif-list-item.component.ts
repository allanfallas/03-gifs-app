import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html',
  standalone: true
})

export class GifListItemComponent { 
  gifItem = input.required<string>();
}
