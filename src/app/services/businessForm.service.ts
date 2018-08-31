import {Injectable} from '@angular/core';
import {Form} from '../models/Form';

@Injectable()
export class BusinessFormService {

  // Service store generated forms for future using. Traditionally it should be stored in local storage or backend.
  public forms: Array<Form>;

  constructor() {
    this.forms = [];
  }

  /**
   * Get form by it id.
   * @param {number} id
   * @returns {Form}
   */
  public getFormById(id: number): Form {
    return this.forms.find(form => form.id == id);
  }
}
