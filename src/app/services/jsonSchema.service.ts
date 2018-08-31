import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/index';

import {Schema, Widget, WidgetItem} from '../models/Schema';
import {Form, FormGroupItem, FormItem} from '../models/Form';
import {AbstractControlOptions} from '@angular/forms/src/model';

@Injectable()
export class JsonSchemaService {

  public validTypes: Array<string>;

  constructor(private httpClient: HttpClient) {
    this.validTypes = ['section', 'input', 'currency', 'date'];
  }

  /**
   * Process schema - construct forms meta-object with FormGroups.
   * @param {Schema} schema
   * @returns {Promise}
   */
  public schemaToForms(schema: Schema): Promise<Array<Form>> {
    return new Promise((resolve, reject) => {
      if (!('widgets' in schema))
        return reject('Schema has an incorrect format! Please refer to valid JSON schema guide');

      let promiseArr = [];

      schema.widgets.forEach(widget => {
        if (widget.type === 'form') {
          promiseArr.push(this.processWidget(widget));
        }
      });

      Promise.all(promiseArr)
        .then(resolve)
        .catch(reject);
    });
  }

  /**
   * Process widget and it items.
   * @param {Widget} widget
   * @returns {Promise<Form>}
   */
  public processWidget(widget: Widget): Promise<Form> {
    return new Promise((resolve, reject) => {
      if (widget.id && widget.name && widget.items) {
        let promiseArr = [];

        widget.items.forEach(item => promiseArr.push(this.processWidgetItem(item)));

        Promise.all(promiseArr).then(formItems => {
          let form = new Form(widget.id, widget.name, formItems);
          form.group = new FormGroup({});
          formItems.forEach(formItem => {
            form.group.setControl(formItem.key, formItem.control);
          });

          return resolve(form);
        }).catch(reject);
      } else {
        return reject('Schema has an incorrect format! Please refer to valid JSON schema guide');
      }
    });
  }

  /**
   * Process widget item. It can be like section with items or just item.
   * @param {WidgetItem} widgetItem
   * @returns {Promise<FormGroupItem | FormItem<string | number>>}
   */
  public processWidgetItem(widgetItem: WidgetItem): Promise<FormGroupItem|FormItem<string|number>> {
    return new Promise((resolve, reject) => {
      if (this.validTypes.indexOf(widgetItem.type) === -1) {
        return reject('Schema has an unsupported type! Please refer to valid JSON schema guide');
      } else if (widgetItem.type === 'section') {
        if (!widgetItem.items)
          return reject('Schema has an incorrect format! Please refer to valid JSON schema guide');

        let promiseArr = [];

        widgetItem.items.forEach(item => promiseArr.push(this.processWidgetItem(item)));

        Promise.all(promiseArr).then(formItems => {
          let section = new FormGroupItem(widgetItem.header, widgetItem.type, widgetItem.header, widgetItem.columns, formItems);
          section.group = new FormGroup({});
          formItems.forEach(formItem => {
            section.group.setControl(formItem.key, formItem.control);
          });

          return resolve(section);
        }).catch(reject);
      } else {
        if (!widgetItem.type || !widgetItem.label)
          return reject('Schema has an incorrect format! Please refer to valid JSON schema guide');

        let item = new FormItem(widgetItem.label, widgetItem.type, widgetItem.label,
          (widgetItem.value ? widgetItem.value : null),
          (widgetItem.required ? widgetItem.required : null),
          (widgetItem.symbol ? widgetItem.symbol : null),
          (widgetItem.precision ? widgetItem.precision : null)
        );
        let controlOptions: AbstractControlOptions = {};
        controlOptions.validators = item.required ? Validators.required : null;
        item.control = new FormControl(item.value, controlOptions);
        return resolve(item);
      }
    });
  }

  /**
   * Get schema from json file.
   * @param {File} file
   * @returns {Observable<any>}
   */
  public getSchemaFromFile(file: File) {
    return new Observable(observer => {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          let schema = JSON.parse(event.target.result);
          observer.next(schema);
          observer.complete();
        } catch (e) {
          observer.error(e);
          observer.complete();
        }
      };

      reader.readAsText(file);
    });
  }

  /**
   * Download schema from web.
   * @param {string} url
   * @returns {Observable<any>}
   */
  public downloadSchema(url: string) {
    return new Observable(observer => {
      this.httpClient.get<JSON>(url).subscribe(data => {
        if (data) {
          observer.next(data);
          observer.complete();
        } else {
          observer.next('There is no JSON or it is incorrect.');
          observer.complete();
        }
      }, err => {
        observer.error(err);
        observer.complete();
      });
    });
  }
}
