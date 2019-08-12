import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor( private http: HttpClient ) { }



  getAllUsers( url ){
    url = 'http://localhost:4400' + url;
    return this.http.get( url );

  }

  getUserFriends( url ){

    return this.http.get( url );

  }

  getUserFriendsOfFriends( url ){

    return this.http.get( url );

  }

}
