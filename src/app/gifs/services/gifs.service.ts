import { GifMapper } from './../mapper/gif.mapper';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GiphyService {

    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    searchgGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);
    searchGifsLoading = signal(true);

    searchHistory = signal<Record<string, Gif[]>>({});
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    constructor() {
        this.loadTrendingGifs();
        this.searchHistory.set(this.loadFromLocalStorage('searchHistory') ?? [])
    }

    loadTrendingGifs() {

        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20
            }
        }).subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
        })

    }


    loadSearchGifs(query: string) {

        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                q: query
            }
        }).subscribe((resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.searchgGifs.set(gifs);
            this.searchGifsLoading.set(false);
        })

    }


    loadSearchGifsWithPipe(query: string) {

        return this.http.
            get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
                params: {
                    api_key: environment.giphyApiKey,
                    limit: 20,
                    q: query
                }
            }).pipe(
                map(({ data }) => data),
                map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
                tap(items => {
                    this.searchHistory.update(history => ({
                        ...history,
                        [query.toLocaleLowerCase()]: items,
                    }));
                    //this.saveToLocalStorage('searchHistory', this.searchHistory());
                })
            )
    }

    getHistoryGifs(query: string): Gif[] {
        return this.searchHistory()[query] ?? [];
    }

    saveToLocalStorage(key: string, data: any) {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    loadFromLocalStorage(key: string) {
        const data = window.localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    
    saveGifToLocalStorage = effect(()=>{
        const historyString = JSON.stringify(this.searchHistory());
        window.localStorage.setItem('searchHistory', historyString);
    })




}