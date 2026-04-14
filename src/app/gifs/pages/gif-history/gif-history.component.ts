import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GiphyService } from '../../services/gifs.service';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
@Component({
  selector: 'app-gif-history',
  imports: [GifsListComponent],
  templateUrl: './gif-history.component.html',
  standalone: true
})
export default class GifHistoryComponent {

  gifService = inject(GiphyService);
  query = toSignal(

    inject(ActivatedRoute).params.pipe(map((params) => params['query']))

  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query())
  })



  /*query = inject(ActivatedRoute).params.subscribe((params) => {
    console.log(params['query'])
  })*/

}
