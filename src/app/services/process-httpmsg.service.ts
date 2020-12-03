import { Injectable } from "@angular/core";

import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProcessHTTPMsgService {

  constructor() { }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    return ErrorObservable.create(errMsg);
  }

}