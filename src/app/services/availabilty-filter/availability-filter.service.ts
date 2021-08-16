import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCatalogState, IState } from '../../reducers';
import { BehaviorSubject, combineLatest } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AvailabilityFilterService {
  public catalogState$ = this.store.select(getCatalogState);

  constructor(private store: Store<IState>) {
  }

  setAvailability(data: any): any {
    console.log('setAvailability BEGIN')
    const checkedAvailability$ = new BehaviorSubject(data);
    let resultObj: any = {};

    combineLatest([checkedAvailability$, this.catalogState$])
      .subscribe(resArr => {
        const checkedAval = resArr[0];
        const catalogState = resArr[1];
        resultObj = {};

        for (const key in checkedAval) {
          if (checkedAval[key] === false) {
            delete checkedAval[key];
          }
        }

        let checkedArr = Object.keys(checkedAval);

        checkedArr = checkedArr.map(elem => elem.toUpperCase());

        // console.log('checkedArr', checkedArr);
        // console.log('catalogState', catalogState);

        for (const catalogStateKey in catalogState) {
          for (let i = 0; i < checkedArr.length; i++) {
            console.log('CONDITION', catalogState[catalogStateKey].availability.replace(/\s+/g, '').toUpperCase() ,' === ', checkedArr[i], catalogState[catalogStateKey].availability.replace(/\s+/g, '').toUpperCase() === checkedArr[i])
            if (catalogState[catalogStateKey].availability.replace(/\s+/g, '').toUpperCase() === checkedArr[i]) {
              resultObj[catalogStateKey] = catalogState[catalogStateKey];
              // console.log('FITERED', catalogState[catalogStateKey]);
            }
          }
        }

        // console.log('RESULT END FOR', resultObj)
      });
    console.log('setAvailability RESULT', resultObj)
    return resultObj;
  }
}
