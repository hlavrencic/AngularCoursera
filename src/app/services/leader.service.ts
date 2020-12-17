import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Restangular } from 'ngx-restangular';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders() : Observable<Leader[]>{
    return this.restangular.all('leaders').getList();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true})
      .pipe(p => p.map(dishes => dishes[0]));
  }
}
