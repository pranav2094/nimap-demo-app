import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/services/common.service';
import { UtilityserviceService } from 'src/services/utilityservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetails:any;
  isNotValidImage:boolean=false;
  constructor(private utility: UtilityserviceService,public _router: Router, private commonService: CommonService) { }

  ngOnInit() {
    // if(!this.utility.isUndefinedOrNull(this.utility.getLS("userDetails"))){
    //   this.userDetails = JSON.parse(this.utility.getLS("userDetails"));
    // }
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.commonService.getCurrentUser().subscribe((res:any)=>{
      this.userDetails = res[0];
    })
  }
  

  onFileSelect(event: any) {
    if (event.target.files && event.target.files.length) {
      for (const file of event.target.files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = new Image();
         
          img.onload = () => {
            const height = img.naturalHeight;
            const width = img.naturalWidth;
            console.log('Width and Height', width, height);
            if(width > 310 && height > 325){
              this.isNotValidImage = true;
              alert("Maximum file size exceeded");
              return;
            }else{
              this.isNotValidImage = false;

            }
          };
          img.src = reader.result as string;
          this.userDetails.image = reader.result;
        };
      }
    }
  }
  openModal(){
      console.log("pl");
      
      this.utility.setLS("fromProfile","1");
      this._router.navigate(["home"]);

  }
}
