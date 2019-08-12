import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { apiEndpoints } from '../../config/config';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor( private httpClientService: HttpClientService ) { }

  ngOnInit() {
    let url = apiEndpoints.getAllUsers
    this.httpClientService.getAllUsers( url )
      .subscribe( (res: HttpResponse<any>) => {
        
      })

  }


}
