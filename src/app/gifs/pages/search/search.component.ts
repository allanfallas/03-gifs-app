import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GiphyService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search',
  imports: [GifsListComponent],
  templateUrl: './search.component.html',
  standalone: true
})
export default class SearchComponent {
  gifService = inject(GiphyService);
  gifs = signal<Gif[]>([]);
  onSearch(query: string) {
    //this.gifService.loadSearchGifs(query);
    this.gifService.loadSearchGifsWithPipe(query).subscribe((resp) => {
        this.gifs.set(resp);
    });
    
  }
}