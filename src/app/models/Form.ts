/**
 * Class which represent business-form.
 */
import {FormControl, FormGroup} from '@angular/forms';

export class FormItem<T> {
  public key: string;
  public type: string;
  public label: string;
  public value?: T;
  public required?: boolean;
  public symbol?: string;
  public precision?: number;

  public control: FormControl;

  constructor(key: string, type: string, label: string, value?: T, required?: boolean, symbol?: string, precision?: number) {
    this.key = key;
    this.type = type;
    this.label = label;
    this.value = value;
    this.required = required;
    this.symbol = symbol;
    this.precision = precision;
  }
}

export class FormGroupItem {
  public key: string;
  public type: string;
  public header: string;
  public columns: number;
  public items: Array<FormItem<number|string>>;

  public group: FormGroup;

  constructor(key: string, type: string, header: string, columns: number = 1, items: Array<FormItem<number|string>>) {
    this.key = key;
    this.type = type;
    this.header = header;
    this.columns = columns;
    this.items = items;
  }
}

export class Form {
  public id: number;
  public name: string;
  public items: Array<FormGroupItem|FormItem<number|string>>;

  public group: FormGroup;

  constructor(id: number, name: string, items: Array<FormGroupItem|FormItem<number|string>>) {
    this.id = id;
    this.name = name;
    this.items = items;
  }
}
