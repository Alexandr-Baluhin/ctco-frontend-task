import {Component, OnInit} from '@angular/core';

import {Form} from '../../models/Form';
import {BusinessFormService} from '../../services/businessForm.service';

@Component({
  selector: 'site-forms-overview-comp',
  templateUrl: './formsOverview.comp.html',
  styleUrls: ['./formsOverview.comp.less']
})
export class FormsOverviewComp implements OnInit {

  public forms: Array<Form>;

  constructor(private businessFormService: BusinessFormService) {
    this.forms = [];
  }

  public ngOnInit(): void {
    this.forms = this.businessFormService.forms;
  }

  public setForms(forms): void {
    this.forms = this.forms.concat(forms);
    this.businessFormService.forms = this.forms;
  }
}
