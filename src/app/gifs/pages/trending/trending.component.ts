import { AfterViewInit, Component, ElementRef, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GiphyService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/scroll.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  standalone: true
})
export default class TrendingComponent implements AfterViewInit {


  gifService = inject(GiphyService);
  scrollStateService = inject(ScrollStateService);
  scrollDivElement = viewChild<ElementRef<HTMLDivElement>>('groupDiv');


  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivElement()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.getScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivElement()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    this.scrollStateService.setScrollState(scrollTop);

    const isAtBottom = (scrollTop + clientHeight + 300) >= scrollHeight;

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
  }


}
