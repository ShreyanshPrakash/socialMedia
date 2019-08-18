import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor( private http: HttpClient ) { }



  getAllUsers( url, params?: HttpParams ){
    return this.http.get( url, { params: params } );

  }

  getUserFriends( url, params?: HttpParams ){
    return this.http.get( url, { params: params } );

  }

}
