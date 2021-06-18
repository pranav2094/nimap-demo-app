import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private utility: UtilityserviceService,public _router: Router) { }

  ngOnInit(): void {
  }
  redirectHome(){
    this.utility.setLS("fromProfile","0");
  }
  redirectProfile(){
    if(this.utility.isUndefinedOrNull(this.utility.getLS("userDetails"))){
      Swal.fire({
        icon: 'error',
        text: 'User profile details not found. Please register first.',
      })
    }else{
      this._router.navigate(["profile"]);

    }
  }
}
