import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MaterializeDirective,MaterializeAction} from "angular2-materialize";
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  hide = true;

  form: FormGroup;
  submit: boolean=false;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService) {
     }

    public ngOnInit() {

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


    this.form=new FormGroup({

        username: new FormControl("",Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$')]) ),
        password: new FormControl("", Validators.required),
    });
  }

  login(form) {
      this.loading = true;
      this.model=this.form.value;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
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
