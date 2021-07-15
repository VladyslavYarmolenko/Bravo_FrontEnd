import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SidebarService {
  sidebarStatus$ = new BehaviorSubject(true);
  sideBarStatus: boolean;

  constructor() {
    this.sideBarStatus = true;
    this.sidebarStatus$.subscribe(value => this.sideBarStatus = value);
  }

  changeSideBarStatus(): void {
    this.sidebarStatus$.next(!this.sideBarStatus);
  }
}
