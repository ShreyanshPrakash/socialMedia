import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/models/user.model';
import { ErrorModel } from 'src/models/error.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  error: any;
  userSelection: UserModel;

  constructor() {
    this.userSelection = new UserModel();
    this.error = new ErrorModel();
   }

  ngOnInit() {
    
  }

  handleError( error ){
    this.error = error;
  }
  
  handleRowClick( data ){
    this.userSelection = data;
  }

}
