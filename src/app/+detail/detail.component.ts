import { Component } from '@angular/core';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Detail` component loaded asynchronously');

@Component({
    // moduleId: module.id, -> inutil si inofensiv daca templateUrl foloseste ./
    selector: 'detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.css']
})
export class DetailComponent {
    constructor() {
        console.log('constructor DetailComponent');
    }

    ngOnInit() {
        console.log('hello `Detail` component');
    }

}
