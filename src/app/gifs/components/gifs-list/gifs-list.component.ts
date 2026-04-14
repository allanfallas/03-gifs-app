import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GifListItemComponent } from "../gif-list-item/gif-list-item.component";
import { Gif } from '../../interfaces/gif.interface';


@Component({
  selector: 'app-gifs-list',
  imports: [GifListItemComponent],
  templateUrl: './gifs-list.component.html',
  standalone: true
})
export class GifsListComponent { 

  gifList = input.required<Gif[]>();

}
