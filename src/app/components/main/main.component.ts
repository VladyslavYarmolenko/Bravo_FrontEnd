import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { routeTypes } from '../../interfaces';
import { SidebarService } from '../../services/sidebar.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  activeRoute: string;
  isSidebarFullWidth: boolean;
  sideNavState: BehaviorSubject<boolean>;

  constructor(private sidebarService: SidebarService) {
    this.sideNavState = this.sidebarService.sidebarStatus$;
    this.activeRoute = routeTypes.orders;
    this.isSidebarFullWidth = true;
  }

  setActiveRoute(routeName: string): void {
    this.activeRoute = routeName;
  }

  ngOnInit(): void {}
}
