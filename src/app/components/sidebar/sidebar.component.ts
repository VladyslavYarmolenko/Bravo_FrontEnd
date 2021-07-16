import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { routeTypes } from 'src/app/constants';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit {
  public activeRoute: string;
  public isSidebarFullWidth: boolean;
  public sideNavState: BehaviorSubject<boolean>;

  constructor(private sidebarService: SidebarService, private auth: AuthService) {
    this.sideNavState = this.sidebarService.sidebarStatus$;
    this.activeRoute = routeTypes.orders;
    this.isSidebarFullWidth = true;
  }

  setActiveRoute(routeName: string): void {
    this.activeRoute = routeName;
  }

  logout(): void {
    this.auth.onLogout();
  }

  ngOnInit(): void {
  }
}
