import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {JsonSchemaService} from '../../services/jsonSchema.service';
import {forkJoin} from 'rxjs/index';
import {Form} from '../../models/Form';
import {Schema} from '../../models/Schema';

@Component({
  selector: 'site-schema-loader-comp',
  templateUrl: './schemaLoader.comp.html',
  styleUrls: ['./schemaLoader.comp.less']
})
export class SchemaLoaderComp implements OnInit, OnDestroy {

  @Output() uploaded: EventEmitter<Array<Form>> = new EventEmitter<Array<Form>>();

  public schemaFiles: any[];
  public schemaLink: string;

  public error: boolean;
  public errorMsg: string;

  constructor(private jsonSchema: JsonSchemaService) {
    this.error = false;
  }

  public ngOnInit(): void {

  }

  public ngOnDestroy(): void {

  }

  public onFileChange(event) {
    this.schemaFiles = event.target.files;
  }

  public onSubmit(): void {
    this.error = false;

    if (this.schemaFiles && this.schemaFiles.length > 0) {
      let observables = [];

      for (let i = 0; i < this.schemaFiles.length; i++) {
        observables.push(this.jsonSchema.getSchemaFromFile(this.schemaFiles[i]));
      }

      forkJoin(observables).subscribe(data => {
        if (data && data.length > 0) {
          let promiseArr = [];

          data.forEach(form => promiseArr.push(this.jsonSchema.schemaToForms(form)));

          Promise.all(promiseArr).then(forms => {
            forms = forms.reduce((acc, val) => [...acc, ...val]);
            this.uploaded.emit(forms);
          }).catch(err => {
            this.error = true;
            this.errorMsg = err;
          });
        }
      }, err => {
        this.error = true;
        this.errorMsg = err;
      });
    } else if (this.schemaLink) {
      this.jsonSchema.downloadSchema(this.schemaLink).subscribe((data: Schema) => {
        if (data) {
          this.jsonSchema.schemaToForms(data)
            .then(forms => this.uploaded.emit(forms))
            .catch(err => {
              this.error = true;
              this.errorMsg = err;
            });
        }
      }, err => {
        this.error = true;
        this.errorMsg = 'Error while loading JSON file.';
      });
    }
  }
}
