import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  userDetails:any;
  constructor(private utility: UtilityserviceService,public _router: Router,private commonService: CommonService) { }

  ngOnInit(): void {
  }
  redirectHome(){
    this.utility.setLS("fromProfile","0");
  }
  
  async redirectProfile(){
    let userPromise = new Promise<void>((res, rej) => {
      this.commonService.getCurrentUser().subscribe((data:any)=>{
        this.userDetails = data[0];
        res();
        console.log("userDetails",this.userDetails);
        
      })
       
      });
     await userPromise;
     if(!this.utility.isUndefinedOrNull(this.userDetails)){
      this._router.navigate(["profile"]);
     }else{
      Swal.fire({
        icon: 'error',
        text: 'User profile details not found. Please register first.',
      })

     }
    }
}
