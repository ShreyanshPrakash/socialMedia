import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  Friends$: BehaviorSubject<any>;
  getAllUsers$: BehaviorSubject<boolean>;

  constructor() {
    this.Friends$ = new BehaviorSubject( { user: new UserModel(), isInit: true } );
    this.getAllUsers$ = new BehaviorSubject( false );
  }

  setFriends(user) {
    this.Friends$.next(user);
  }

  getFriends() {
    return this.Friends$;
  }

  setAllUsers(user) {
    this.getAllUsers$.next(user);
  }

  getAllUsers() {
    return this.getAllUsers$;
  }


}
