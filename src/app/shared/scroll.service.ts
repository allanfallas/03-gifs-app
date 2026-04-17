import { computed, Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {

    #trendingScrollState = signal<number>(0);

    setScrollState(value: number){
        this.#trendingScrollState.set(value);
    }

    getScrollState = computed(() => this.#trendingScrollState());

    pageScrollState: Record<string, number> = {
        
    }

    
    

}