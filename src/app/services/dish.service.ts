import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable } from 'rxjs/Observable';

import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable()
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes().pipe(obs => obs.map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}