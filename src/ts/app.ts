/// <reference path="../../typings/angular2/angular2.d.ts" />
import {Component, View, bootstrap} from 'angular2/angular2';
import {Router, RouteConfig, RouteParams, RouterLink, RouterOutlet, routerInjectables} from 'angular2/router';

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
    template: `
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" router-link="home">Angular2 Demo App</a>
                <ul class="nav navbar-nav">
                    <li><a router-link="contact-app">Contacts</a></li>
                    <li><a router-link="about">About</a></li>
                </ul>
            </div>
        </nav>

        <div class="container-fluid">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [RouterOutlet, RouterLink]
})
class App {}

bootstrap(App, [routerInjectables]);
