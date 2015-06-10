/// <reference path="../typings/tsd.d.ts" />
import {Component, View, bootstrap, EventEmitter} from 'angular2/angular2';
import {RouteConfig, RouterLink, RouterOutlet, routerInjectables} from 'angular2/router';

import {Home} from './components/home/home';
import {ContactApp} from './components/contact-app/contact-app';
import {About} from './components/about/about';

@Component({
    selector: 'app'
})
@RouteConfig([
    { path: '/', component: Home, as: 'home' },
    { path: '/contact', component: ContactApp, as: 'contact' },
    { path: '/about', component: About, as: 'about' }
])
@View({
    templateUrl: './app.html',
    directives: [RouterOutlet, RouterLink]
})
class App {}

bootstrap(App, [routerInjectables]);
