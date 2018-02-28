import { Component, OnInit, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';

import 'rxjs/add/operator/switchMap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment'

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})

export class DishdetailComponent implements OnInit {
  
    dish: Dish;
    dishIds: number[];
    prev: number;
    next: number;
  
    commentForm: FormGroup;
    newComment: Comment;

    formErrors = {
      author: '',
      comment: ''
    };

    validationMessages = {
      'author': {
        'required':      'Author is required.',
        'minlength':     'Author must be at least 2 characters long.'
      },
      'comment': {
        'required':      'Last Name is required.',
        'minlength':     'Last Name must be at least 2 characters long.'
      }
    };

    constructor(private dishservice: DishService,
      private route: ActivatedRoute,
      private location: Location,
      private fb: FormBuilder) { }
  
    ngOnInit() {
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params
        .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
        .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

      this.createForm();
    }

    setPrevNext(dishId: number) {
      let index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
    }
  
    goBack(): void {
      this.location.back();
    }

    createForm() {
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2)] ],
        rating: ['', [Validators.required] ],
        comment: ['', [Validators.required, Validators.minLength(2)] ],
        agree: false,
        contacttype: 'None',
        message: ''
      });

      this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // (re)set form valitacion msg
    }    
  
    onValueChanged(data?: any){
      if (!this.commentForm) { return; }
  
      const form = this.commentForm;
  
      for(const field in this.formErrors){
        this.formErrors[field] = '';
        const control = form.get(field);
  
        if(control && control.dirty && !control.valid){
          const messages = this.validationMessages[field];
          for(const key in control.errors){
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }

  }
