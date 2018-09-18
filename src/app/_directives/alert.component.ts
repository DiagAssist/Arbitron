import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';
import { toast } from 'angular2-materialize';

@Component({
    moduleId: module.id.toString(),
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });

    }
    onLoad(){
    if (this.message) {toast(this.message.text, 1000)};
    }
}
