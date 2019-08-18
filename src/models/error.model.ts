import { HttpErrorResponse } from '@angular/common/http';


export class ErrorModel{
    hasError: boolean;
    errorMessage: string;
    errorResponse: HttpErrorResponse;

    constructor(){
        this.hasError = false;
        this.errorMessage = '';
        this.errorResponse = new HttpErrorResponse( {} );
    }
}