import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Restangular } from 'ngx-restangular';
import { Feedback } from '../shared/feedback';
import { map } from 'rxjs/operators';

@Injectable()
export class FeedbackService {

  constructor(private restangular: Restangular) { }

  submitFeedback(feedback: Feedback) : Observable<Feedback>{
    return this.restangular.all('feedback').post({feedback}).pipe(map((response: any) => response.feedback));
  }
}
