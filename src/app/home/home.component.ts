import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { find, get, pull } from 'lodash';
import { UtilityserviceService } from 'src/services/utilityservice.service';
import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('tagInput') tagInputRef: ElementRef;
  newsLetter: boolean = false;
  image: any = '../../assets/images/avatar.png';
  age = 30;
  profileData: any;
  address: any;
  mobile:any;
  addr1: any;
  addr2: any;
  country: any;
  firstName: any;
  lastName: any;
  number: any;
  state: any;
  isNotValidImage:boolean=false;
  email: any;
  title:any;
  states = [
    { key: 'Maharashtra', value: 'Maharashtra' },
    { key: 'Gujrat', value: 'Gujrat' },
    { key: 'Punjab', value: 'Punjab' }
  ];
  countries = [
    { key: 'India', value: 'India' },
    { key: 'USA', value: 'USA' },
    { key: 'UK', value: 'UK' }
  ];
  addrType = [
    { id: 'Home', name: 'Home' },
    { id: 'Company', name: 'Company' }
  ];
  items: string[] = [];
  submitted: boolean = false;
  registerForm: FormGroup;
  userDetails:any;
  constructor(private formBuilder: FormBuilder,private utility: UtilityserviceService) {
  }

  ngOnInit() {
    if(!this.utility.isUndefinedOrNull(this.utility.getLS("userDetails"))){
      this.userDetails = JSON.parse(this.utility.getLS("userDetails"));
      this.title = this.userDetails.title || '';
      this.image = this.userDetails.image || '';
      this.firstName = this.userDetails.firstName || '';
      this.lastName = this.userDetails.lastName || '';
      this.email = this.userDetails.email || '';
      this.mobile = this.userDetails.mobile || '';
      this.age = this.userDetails.age || '';
      this.state = this.userDetails.state || '';
      this.country = this.userDetails.country || '';
      this.address = this.userDetails.address || '';
      this.addr1 = this.userDetails.addr1 || '';
      this.addr2 = this.userDetails.addr2 || '';
      this.items = this.userDetails.tag || '';
      this.newsLetter = this.userDetails.newsLetter || false
      
    }
    this.registerForm = this.formBuilder.group({
      title: [this.title],
      image: [this.image],
      firstName: [this.firstName, [Validators.required]],
      lastName: [this.lastName],
      email: [this.email],
      mobile: [this.mobile],
      age: [this.age],
      state: [this.state],
      country: [this.country],
      address: [this.address],
      addr1: [this.addr1],
      addr2: [this.addr2],
      tag: [],
      newsLetter: [this.newsLetter]
    });

    if(this.utility.getLS("fromProfile")=="1"){
      $('#userRegistrationModal').css({ "display": "block", "background": "rgba(0, 0, 0, 0.6)" });
    }

  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
 
    if (this.registerForm.invalid) {
      return;
    }else if(this.isNotValidImage ){
      alert("Maximum file size exceeded");
      return;
    } 
    else{
      this.registerForm.value.age = this.age;
      this.registerForm.value.tag = this.items;
      this.utility.setLS("userDetails", JSON.stringify(this.registerForm.value));
      if(this.utility.getLS("fromProfile")=="1"){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User details updated!',
          showConfirmButton: false,
          timer: 1500
        })
      }else{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registration Successful!',
          showConfirmButton: false,
          timer: 1500
        })
      }
      
    }
   
  }
  addressChange(event: any) {
    this.address = event.target.value;

  }
  openUserForm() {
    $('#userRegistrationModal').css({ "display": "block", "background": "rgba(0, 0, 0, 0.6)" });
  }
  closeUserForm() {
    $('#userRegistrationModal').css({ "display": "none" });
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
            }else{
              this.isNotValidImage = false;

            }
          };
          img.src = reader.result as string;
          this.image = reader.result;
        };
      }
    }
  }
  


  selectAge(e: any) {
    this.age = e.target.value;
  }
  focusTagInput(): void {
    this.tagInputRef.nativeElement.focus();
  }

  onKeyUp(event: KeyboardEvent): void {
    const inputValue: string = this.registerForm.controls.tag.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space') {
        this.addTag(inputValue);
        this.registerForm.controls.tag.setValue('');
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.items, tag)) {
      this.items.push(tag);
    }
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.items, tag);
    } else {
      this.items.splice(-1);
    }
  }

}
