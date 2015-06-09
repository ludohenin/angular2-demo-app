import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'about',
})
@View({
    templateUrl: './components/about/about.html?v=<%= VERSION %>',
})
export class About {}
