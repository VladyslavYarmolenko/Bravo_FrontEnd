import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { routeTypes } from 'src/app/constants';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
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
