import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'site-app',
  templateUrl: 'app.comp.html',
  styleUrls: [
    'styles/reset.css',
    'styles/common.less',
    'app.comp.less'
  ],
  encapsulation: ViewEncapsulation.None
})

export class AppComp implements OnInit, OnDestroy {

  constructor() {}

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

}
