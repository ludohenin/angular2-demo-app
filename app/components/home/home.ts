import {Component, View} from 'angular2/angular2';

@Component({
    selector: 'about',
})
@View({
    templateUrl: './components/home/home.html?v=<%= VERSION %>',
})
export class Home {}
