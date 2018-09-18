
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../_services/index';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
import {FormGroup, FormControl, Validators} from '@angular/forms';
//import {Users} from '../users';


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'forget-password.component.html',
    styleUrls: ['forget-password.component.css']
})

export class ForgetPasswordComponent implements OnInit {

  model: any = {};
  loading = false;
  hide=true;
  //userList: Users[]=[];
  form: FormGroup;
  submit=false;
  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { }

 addUser(form){
    //console.log(form.value);
    console.log(this.form.value);
    console.log(this.form.status);
  //  this.userList.push(this.form.value);
  /*  this.model=this.form.value;
    console.log("model"+this.model.username);
    console.log(this.form.get('name').value);*/
  }


  public ngOnInit() {

      this.form=new FormGroup({
        firstName: new FormControl("",Validators.compose([Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ\s-]+')]) ),
        lastName: new FormControl("",Validators.compose([Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ\s-]+')]) ),

        username: new FormControl("",Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$')]) ),
        password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(8)])),
        rpassword: new FormControl("", Validators.required),
        reglement: new FormControl("", Validators.required),
    },passwordMatchValidator);
  //   this.form.get('name').setValue('some value');

     function passwordMatchValidator(g: FormGroup) {
        return g.get('rpassword').value === g.get('password').value
           ? null : {'mismatch': true};
     }
  }

  register(form) {
      this.loading = true;
      this.model=this.form.value;
      this.userService.create(this.model)
          .subscribe(
              data => {
                  this.alertService.success('Inscription réussie!', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
            }
  onSubmit(){
  this.submit=true;
  }
}
