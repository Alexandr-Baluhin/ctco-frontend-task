import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {ActivatedRoute, Router} from '@angular/router';
import {BusinessFormService} from '../../services/businessForm.service';
import {Form} from '../../models/Form';

@Component({
  selector: 'site-business-form-comp',
  templateUrl: './businessForm.comp.html',
  styleUrls: ['./businessForm.comp.less']
})
export class BusinessFormComp implements OnInit, OnDestroy {

  private subs: Subscription;

  public form: Form;

  constructor(
    private businessFormService: BusinessFormService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.subs = this.activatedRoute.params.subscribe(params => {
      if (params.id !== null) {
        this.form = this.businessFormService.getFormById(params.id);
        if (!this.form) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  public ngOnDestroy(): void {
  }

  public onSubmit(): void {
    this.router.navigate(['/']);
  }
}
