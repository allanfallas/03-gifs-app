import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../side-menu/side-menu.component";
@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './dashboard.component.html',
  standalone: true
})
export default class DashboardComponent { }
