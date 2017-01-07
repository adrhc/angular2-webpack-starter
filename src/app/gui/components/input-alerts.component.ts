import { Component, IterableDiffer, Input, KeyValueDiffers, ElementRef, HostBinding }        from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import any = jasmine.any;

@Component({
  selector: 'alerts',
  // styleUrls: ['./input-alerts.css'],
  templateUrl: './input-alerts.html'
})
export class InputAlertsComponent {
  // @HostBinding('class') get classes() { return 'alert alert-danger'; }
  dontShowAlerts: boolean = true;
  alerts: string[];
  private subscription: Subscription;
  private differ: IterableDiffer;
  private fakeObject: {data: any} = { data: undefined };
  private label: string;
  private messages: {[key: string]: any} = {
    required: ' is required'
  };

  constructor(differs: KeyValueDiffers, private elRef: ElementRef) {
    this.differ = differs.find({}).create(null);
  }

  @Input('for')
  set alertsFor(alertsFor: NgModel) {
    // console.log('[InputAlertsComponent] alertsFor');
    // console.log(alertsFor);
    this.setUpLabel(alertsFor);
    this.subscription = alertsFor.valueChanges.subscribe(data => this.onFieldUpdate(data, alertsFor));
  }

  ngOnDestroy() {
    console.log('[app] ngOnDestroy: ');
    this.subscription.unsubscribe();
  }

  private onFieldUpdate(data: any, alertsFor: NgModel): void {
    this.alerts = [];
    this.dontShowAlerts = alertsFor.valid || alertsFor.pristine;
    // console.log(`data: ${JSON.stringify(data)}`);
    // console.log(`1. data: ${JSON.stringify(data)}, valid: ${alertsFor.valid}, invalid: ${alertsFor.invalid}, pristine: ${alertsFor.pristine}`);
    this.fakeObject.data = data;
    // const changes = this.differ.diff(this.fakeObject);
    // if ( changes ) {
    //   console.log(`changes detected for ${alertsFor.name}:`);
    //   changes.forEachChangedItem(r => console.log('changed ', r.currentValue));
    //   changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
    //   changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
    // }
    if (alertsFor.errors) {
      // console.log(`2. data: ${JSON.stringify(data)}, valid: ${alertsFor.valid}, invalid: ${alertsFor.invalid}, pristine: ${alertsFor.pristine}`);
      // console.log(`2. alertsFor.errors: ${JSON.stringify(alertsFor.errors)}`);
      for (const key in alertsFor.errors) {
        if (alertsFor.errors.hasOwnProperty(key)) {
          // console.log(`${key}: ${alertsFor.errors[key]}`);
          this.alerts.push(this.label + this.messages[key]);
        }
      }
    }
  }

  private setUpLabel(alertsFor: NgModel): void {
    const labelElem = this.elRef.nativeElement.parentElement.querySelector('label');
    // console.log('[InputAlertsComponent] labelElem:');
    // console.log(labelElem);
    const inputElem = this.elRef.nativeElement.parentElement.querySelector(
      '[name=' + alertsFor.name + ']');
    // console.log('[InputAlertsComponent] inputElem:');
    // console.log(inputElem);
    let labelElemText: string;
    if (labelElem) {
      labelElemText = labelElem.innerText || labelElem.textContent
    }
    this.label = labelElemText ? labelElemText : inputElem.placeholder;
    // console.log(`[InputAlertsComponent] inputElem.placeholder: ${inputElem.placeholder}`);
    // console.log(`[InputAlertsComponent] this.label: ${this.label}`);
  }

}
