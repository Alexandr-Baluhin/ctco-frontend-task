import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {BusinessFormService} from '../../services/businessForm.service';
import {Form, FormItem} from '../../models/Form';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'site-business-form-item-comp',
  templateUrl: './businessFormItem.comp.html',
  styleUrls: ['./businessFormItem.comp.less']
})
export class BusinessFormItemComp implements OnInit, OnDestroy {

  @Input() group: FormGroup;
  @Input() item: FormItem<string|number>;

  constructor() {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

  get isNotValid() { return this.item.required && this.group.controls[this.item.key].invalid && (
    this.group.controls[this.item.key].dirty ||
    this.group.controls[this.item.key].touched); }
}
