import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor( private http: HttpClient ) { }



  getAllUsers( url, params?: HttpParams ){
    url = 'http://localhost:4400' + url;
    return this.http.get( url, { params: params } );

  }

  getUserFriends( url, params?: HttpParams ){
    url = 'http://localhost:4400' + url;
    return this.http.get( url, { params: params } );

  }

  // getUserFriendsOfFriends( url ){

  //   return this.http.get( url );

  // }

}
