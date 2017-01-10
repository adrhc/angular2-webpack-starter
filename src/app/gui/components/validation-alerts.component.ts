import {
  Component, IterableDiffer, Input, KeyValueDiffers, ElementRef
}        from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import any = jasmine.any;

@Component({
  selector: 'validations',
  // styleUrls: ['./validation-alerts.css'],
  templateUrl: './validation-alerts.html'
})
export class ValidationAlertsComponent {
  showAlerts: boolean = false;
  // alerts: string[];
  label: string;
  _alertsFor: NgModel;
  private jqFormGroupElem: any;
  private jqIcon: any;
  private jqElemsToAlert: any[];
  // private jqLabelElem: any;
  // private jqInputElem: any;
  // private focusCSS: string;
  private subscription: Subscription;
  private differ: IterableDiffer;
  private fakeObject: {data: any} = { data: undefined };
  // private messages: {[key: string]: any} = {
  //   required: ' is required'
  // };

  private static appendGlypicon(jqInputElem: any): any {
    let jqIcon: any = jQuery.parseHTML(
      '<span class="glyphicon form-control-feedback" aria-hidden="true"></span>');
    jqIcon = $(jqIcon);
    return jqIcon.insertAfter(jqInputElem);
  }

  constructor(differs: KeyValueDiffers, private elRef: ElementRef) {
    this.differ = differs.find({}).create(null);
  }

  @Input('for')
  set alertsFor(alertsFor: NgModel) {
    this._alertsFor = alertsFor;
    // console.log('[ValidationAlertsComponent] alertsFor');
    // console.log(alertsFor);
    this.setUpLabel(alertsFor);
    this.subscription = alertsFor.valueChanges.subscribe(data => this.onFieldUpdate(data, alertsFor));
  }

  ngOnDestroy() {
    console.log('[app] ngOnDestroy: ');
    this.subscription.unsubscribe();
  }

  private onFieldUpdate(data: any, alertsFor: NgModel): void {
    // console.log(`1. data: ${JSON.stringify(data)}, valid: ${alertsFor.valid}, invalid: ${alertsFor.invalid}, pristine: ${alertsFor.pristine}`);
    // this.alerts = [];
    this.cssForStatus(alertsFor.valid ? 'has-success has-feedback' : 'has-error has-feedback');
    this.showAlerts = !alertsFor.valid && !alertsFor.pristine && alertsFor.errors !== {};
    // if ( this.dontShowAlerts ) {
    //   return;
    // }
    // this.fakeObject.data = data;
    // const changes = this.differ.diff(this.fakeObject);
    // if ( changes ) {
    //   console.log(`changes detected for ${alertsFor.name}:`);
    //   changes.forEachChangedItem(r => console.log('changed ', r.currentValue));
    //   changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
    //   changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
    // }
    // if ( alertsFor.errors ) {
    //   // console.log(`2. data: ${JSON.stringify(data)}, valid: ${alertsFor.valid}, invalid: ${alertsFor.invalid}, pristine: ${alertsFor.pristine}`);
    //   // console.log(`2. alertsFor.errors: ${JSON.stringify(alertsFor.errors)}`);
    //   for (const key in alertsFor.errors) {
    //     if ( alertsFor.errors.hasOwnProperty(key) ) {
    //       // console.log(`${key}: ${alertsFor.errors[key]}`);
    //       this.alerts.push(this.label + this.messages[key]);
    //     }
    //   }
    // }
  }

  /* dealing with focus
   private cacheThenRemoveCSS(target: EventTarget): void {
   const jqElem = $(target);
   if (jqElem.hasClass('has-success')) {
   this.focusCSS = 'has-success has-feedback';
   }
   if (jqElem.hasClass('has-error')) {
   this.focusCSS = 'has-error has-feedback';
   }
   if (this.jqFormGroupElem) {
   this.jqFormGroupElem.removeClass(this.focusCSS);
   } else if (this.jqLabelElem) {
   this.jqLabelElem.removeClass(this.focusCSS);
   }
   jqElem.removeClass(this.focusCSS);
   }

   private restoreCSS(target: EventTarget): void {
   if (!this.focusCSS) {
   return;
   }
   const jqElem = $(target);
   if (this.jqFormGroupElem) {
   this.jqFormGroupElem.addClass(this.focusCSS);
   return;
   }
   if (this.jqLabelElem) {
   this.jqLabelElem.addClass(this.focusCSS);
   }
   jqElem.addClass(this.focusCSS);
   }

   private onFocus(eventObject: Event): void {
   // console.log('[ValidationAlertsComponent] onFocus:');
   // console.log(eventObject.target);
   this.cacheThenRemoveCSS(eventObject.target);
   }

   private onBlur(eventObject: Event): void {
   // console.log('[ValidationAlertsComponent] onBlur:');
   // console.log(eventObject.target);
   this.restoreCSS(eventObject.target);
   }
   */

  private cssForStatus(css: string): void {
    // dealing with focus
    // this.focusCSS = css;
    // if (this.jqInputElem.is(':focus')) {
    //   return;
    // }

    const success: boolean = css.includes('has-success');
    const classToRemove: string = success ? 'has-error has-feedback' : 'has-success has-feedback';
    if ( this.jqIcon ) {
      // optional feedback icon
      this.jqIcon.removeClass(success ? 'glyphicon-remove' : 'glyphicon-ok');
      this.jqIcon.addClass(success ? 'glyphicon-ok' : 'glyphicon-remove');
    }
    if ( this.jqFormGroupElem ) {
      // form-group
      this.jqFormGroupElem.removeClass(classToRemove);
      this.jqFormGroupElem.addClass(css);
    } else {
      // input and optional label
      for (let elem of this.jqElemsToAlert) {
        elem.removeClass(classToRemove);
        elem.addClass(css);
      }
    }
  }

  private setUpLabel(alertsFor: NgModel): void {
    this.jqElemsToAlert = [];
    const jqAlertsElem = $(this.elRef.nativeElement);
    // console.log('this.elRef.nativeElement: ' + jqAlertsElem.prop('tagName'));

    // preparing the form-group
    this.jqFormGroupElem = jqAlertsElem.closest('.form-group');
    if ( !this.jqFormGroupElem.length ) {
      this.jqFormGroupElem = null;
      // } else {
      //   console.log(`[ValidationAlertsComponent] jqFormGroupElem: tagName = ${this.jqFormGroupElem.prop('tagName')}, class = ${this.jqFormGroupElem.attr('class')}`);
    }

    // preparing the input using the input-group if any
    const jqInputGroup = jqAlertsElem.prevAll('.input-group:first');
    let jqInputElem: any;
    if ( jqInputGroup.length ) {
      jqInputElem = jqInputGroup.children('[name=' + alertsFor.name + ']:first');
      // console.log(`[ValidationAlertsComponent] jqInputGroup: tagName = ${jqInputGroup.prop('tagName')}, class = ${jqInputGroup.attr('class')}`);
    } else {
      jqInputElem = jqAlertsElem.prevAll('[name=' + alertsFor.name + ']:first');
      // console.log('[ValidationAlertsComponent] jqInputElem:');
      // console.log(`[ValidationAlertsComponent] jqInputElem: val = ${this.jqInputElem.val()}, tagName = ${this.jqInputElem.prop('tagName')}, class = ${this.jqInputElem.attr('class')}`);
    }
    this.jqElemsToAlert.push(jqInputElem);

    // preparing the label
    const jqLabelElem = jqAlertsElem.prevAll('label:first');
    let labelElemText: string;
    if ( jqLabelElem.length ) {
      // console.log(`[ValidationAlertsComponent] jqLabelElem: html = ${this.jqLabelElem.html()}, tagName = ${this.jqLabelElem.prop('tagName')}, for = ${this.jqLabelElem.attr('for')}, class = ${this.jqLabelElem.attr('class')}`);
      labelElemText = jqLabelElem.val();
      this.jqElemsToAlert.push(jqLabelElem);
    }
    this.label = labelElemText ? labelElemText : jqInputElem.attr('placeholder');

    // preparing glyphicon form-control-feedback
    this.jqIcon = jqAlertsElem.prevAll('.form-control-feedback:first');
    if ( !this.jqIcon.length ) {
      // this.jqIcon = jqAlertsElem.children('.form-control-feedback:first');
      // this.useInternalGlyphicon = true;
      this.jqIcon = ValidationAlertsComponent.appendGlypicon(jqInputElem);
    }
    // console.log(`[ValidationAlertsComponent] jqIcon: tagName = ${this.jqIcon.prop('tagName')}, class = ${this.jqIcon.attr('class')}`);

    // dealing with focus
    // this.jqInputElem.focusin((eventObject: Event) => this.onFocus(eventObject));
    // this.jqInputElem.focusout((eventObject: Event) => this.onBlur(eventObject));
  }

}
