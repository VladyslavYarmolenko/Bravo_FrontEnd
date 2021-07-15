import { Component, OnInit } from '@angular/core';

import { routeTypes } from 'src/app/constants';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent implements OnInit {
  public activeRoute: string;
  public isSidebarFullWidth: boolean;
  public sideNavState: BehaviorSubject<boolean>;

  constructor(private sidebarService: SidebarService) {
    this.sideNavState = this.sidebarService.sidebarStatus$;
    this.activeRoute = routeTypes.orders;
    this.isSidebarFullWidth = true;
  }

  setActiveRoute(routeName: string): void {
    this.activeRoute = routeName;
  }

  ngOnInit(): void {
  }
}
