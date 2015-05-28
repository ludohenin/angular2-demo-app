/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {RouteConfig, RouterLink, RouterOutlet, routerInjectables} from 'angular2/router';

import {Home} from './components/home';
import {ContactApp} from './components/contact-app';
import {About} from './components/about';

@Component({
    selector: 'app',
})
@RouteConfig([
    { path: '/', component: Home, as: 'home' },
    { path: '/contact', component: ContactApp, as: 'contact-app' },
    { path: '/about', component: About, as: 'about' }
])
@View({
    templateUrl: './templates/app.html',
    directives: [RouterOutlet, RouterLink]
})
class App {}

bootstrap(App, [routerInjectables]);
