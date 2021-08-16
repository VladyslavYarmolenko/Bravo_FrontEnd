import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DateFilterService {
  public dateFilterValue$: BehaviorSubject<any | null>;

  constructor() {
    this.dateFilterValue$ = new BehaviorSubject<any | null>(null);
  }

  getDates(datesValue: any, state: any): any {

    const dates = {
      startDate: Date.parse(datesValue.start),
      endDate: Date.parse(datesValue.end)
    };
    const resultObj: { [x: string]: any } = {};
    this.dateFilterValue$ = new BehaviorSubject<any | null>(dates);

    this.dateFilterValue$
      .subscribe(datesObj => {
        for (const stateKey in state) {
          if (datesObj.startDate < Date.parse(state[stateKey].ordered) && Date.parse(state[stateKey].ordered) < datesObj.endDate) {
            resultObj[stateKey] = { ...state[stateKey] };
          }
        }
      });
    return resultObj;
  }
}

