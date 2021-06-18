import { Injectable } from '@angular/core';
declare var bootbox: any;
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UtilityserviceService {
  returnVal: any;
  constructor() { }

  isFilled(str: string): boolean {
    if (str == undefined || str == '' || str == null) {
      return false;
    }
    else {
      return true;
    }
  }

  setLS(key: string, value: string): boolean {
    //window.localStorage.setItem(key, value);
    window.sessionStorage.setItem(key, value);
    return true;
  }

  getLS(key: string): string {
    //this.returnVal = window.localStorage.getItem(key);
    this.returnVal = window.sessionStorage.getItem(key);
    if (this.isFilled(this.returnVal)) {
      return this.returnVal;
    }
    else {
      return '';
    }
  }



  


 



  isUndefinedOrNull(val: string) {
    return val === null || val == "" || val == "undefined" || val == "null" || val == undefined;
  }



 

 
 



}

