import { Component, IterableDiffer, Input, KeyValueDiffers }        from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import any = jasmine.any;

@Component({
  selector: 'input-alerts',
  templateUrl: './input-alerts.html'
})
export class InputAlertsComponent {
  private subscription: Subscription;
  private differ: IterableDiffer;
  private fakeObject: {data: any} = { data: undefined };

  constructor(differs: KeyValueDiffers) {
    this.differ = differs.find({}).create(null);
  }

  @Input('for')
  set alertsFor(alertsFor: NgModel) {
    this.subscription = alertsFor.update.subscribe((data) => {
      // console.log(`data: ${JSON.stringify(data)}`);
      this.fakeObject.data = data;
      const changes = this.differ.diff(this.fakeObject);
      if ( changes ) {
        console.log(`changes detected for ${alertsFor.name}:`);
        changes.forEachChangedItem(r => console.log('changed ', r.currentValue));
        changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
        changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
      }
      return data;
    });
  }

  ngOnDestroy() {
    console.log('[app] ngOnDestroy: ');
    this.subscription.unsubscribe();
  }

}
