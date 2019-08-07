import { Component } from '@angular/core';

/**
 * Generated class for the ContactFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contact-form',
  templateUrl: 'contact-form.html'
})
export class ContactFormComponent {

  text: string;

  constructor() {
    console.log('Hello ContactFormComponent Component');
    this.text = 'Hello World';
  }

}
