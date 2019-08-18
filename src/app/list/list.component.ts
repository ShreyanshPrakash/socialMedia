import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { apiEndpoints } from '../../config/config';
import { HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ErrorModel } from '../../models/error.model';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Output() error: EventEmitter<any>;
  @Output() rowSelection: EventEmitter<any>;

  users: any;
  errorModel: ErrorModel;
  recordsPerPage: any;
  pages: Array<any>;

  constructor(private httpClientService: HttpClientService, private util: UtilityService) {
    this.error = new EventEmitter<any>();
    this.rowSelection = new EventEmitter<any>();
    this.errorModel = new ErrorModel();
    this.recordsPerPage = 4;
    this.pages = [];
    this.users = [];
  }

  ngOnInit() {
    let url = apiEndpoints.getAllUsers
    this.getAllUsers( url, this.constructParams() );

    this.util.getFriends().subscribe(userRes => { 
      if (!userRes.isInit) {
        userRes.user.id ? this.handleUserClick(userRes.user) : this.getAllUsers( url, this.constructParams() );
      }
    });

    this.util.getAllUsers().subscribe(isTrue => {
      isTrue ? this.getAllUsers( url, this.constructParams() ) : null;
    });

  }

  constructParams(){
    let params = new HttpParams();
    params = params.set( 'page', '1' );
    params = params.set( 'record', this.recordsPerPage.toString() );
    return params;
  }

  handleUserClick(user) {
    let url = apiEndpoints.getUserFriends
    let params = new HttpParams();
    params = params.set('userId', user.id);
    this.rowSelection.emit(user);
    this.getfriendsOfUser(url, params);
  }

  handlePageination( event, page ){
    let url = apiEndpoints.getAllUsers;
    let params = new HttpParams();
    params = params.set( 'page', page );
    params = params.set( 'record', this.recordsPerPage.toString() );
    this.getAllUsers( url, params );
  }


  getAllUsers(url: string, params?: HttpParams) {
    this.httpClientService.getAllUsers(url, params )
      .subscribe((res: HttpResponse<any>) => {
        this.users = res[0];
        this.pages = new Array( Math.ceil( Number(res[1][0]['COUNT(*)']) / this.recordsPerPage ) );
      }, (err: HttpErrorResponse) => {
        this.handleError( err );
      });
  }

  getfriendsOfUser(url: string, params) {
    this.pages = [ ];
    this.httpClientService.getUserFriends(url, params)
      .subscribe((res: HttpResponse<any>) => {
        this.users = res;
      }, (err: HttpErrorResponse) => {
        this.handleError( err );
      })
  }

  handleError(error: HttpErrorResponse) {
    this.errorModel.hasError = true;
    this.errorModel.errorMessage = 'Something went wrong.Please try again later';
    this.errorModel.errorResponse = error;
    this.error.emit(this.errorModel);
    return throwError(error);
  }

  ngOnDestroy() {
    this.util.getFriends().unsubscribe();
    this.util.getAllUsers().unsubscribe();
  }

}