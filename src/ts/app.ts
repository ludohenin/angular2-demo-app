/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, RouterLink, RouterOutlet, routerInjectables} from 'angular2/router';

import {Home} from './components/home';
import {ContactApp} from './components/contact-app';
// TODO: move to contact-app when child route bug is fixed.
import {ContactForm} from './components/contact-form';
import {About} from './components/about';

@Component({
    selector: 'app'
})
@RouteConfig([
    { path: '/', component: ContactApp, as: 'home' },
    { path: '/add', component: ContactForm, as: 'add' },
    { path: '/about', component: About, as: 'about' }
])
@View({
    templateUrl: './templates/app.html',
    directives: [RouterOutlet, RouterLink]
})
class App {}

bootstrap(App, [routerInjectables]);
