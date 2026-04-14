import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GiphyService } from 'src/app/gifs/services/gifs.service';

interface MenuOption {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'app-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  standalone: true
})


export default class SideMenuOptionsComponent {

  gifService = inject(GiphyService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: '/dashboard/trending',
      subLabel: 'Gifs Populares'
    },    
    {
      icon: 'fa-solid fa-magnifying',
      label: 'Buscador',
      route: '/dashboard/search',
      subLabel: 'Buscar gifs'
    }
  ] }
