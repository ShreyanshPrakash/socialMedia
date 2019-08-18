import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { UtilityService } from '../utility.service';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-steps-indicator',
  templateUrl: './steps-indicator.component.html',
  styleUrls: ['./steps-indicator.component.scss']
})
export class StepsIndicatorComponent implements OnInit {

  @Input() userSelection: string;

  breadCrumbs: Array<UserModel>;

  constructor(private util: UtilityService) {
    this.breadCrumbs = [];
  }

  ngOnChanges(changes: SimpleChanges) { 
    if ( changes.userSelection.currentValue && changes.userSelection.currentValue !== this.breadCrumbs[this.breadCrumbs.length - 1]) {
      this.breadCrumbs.push(changes.userSelection.currentValue);
    } 
  }
  ngOnInit() {

  }

  getAllUsers( event ) {
    if( this.breadCrumbs.length ){
      this.util.setAllUsers( true );
      this.breadCrumbs = this.breadCrumbs.slice(0,1);;
    }
  }

  handleBreadcrumbClick( event, entity: UserModel ) { 
    let index = this.breadCrumbs.indexOf( entity );
    console.log( this.breadCrumbs );
    console.log( index );
    if( index < this.breadCrumbs.length -1 ){
      this.breadCrumbs = this.breadCrumbs.slice(0, index);
      this.util.setFriends( { user: entity, isInit: false } ); 
    }
    console.log( this.breadCrumbs );
  }
}
