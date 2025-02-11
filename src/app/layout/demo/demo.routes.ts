import {Routes} from '@angular/router';
import {DemoComponent} from './demo/demo.component';
import {ButtonDemoComponent} from './button-demo/button-demo.component';
import {InputDemoComponent} from './input-demo/input-demo.component';

export const routes: Routes = [
    {
        path: '',
        component: DemoComponent,
        children: [
            {
                path: 'buttons',
                component: ButtonDemoComponent
            },
            {
                path: 'inputs',
                component: InputDemoComponent
            },
            {
              path: 'cards',
              component: ButtonDemoComponent
            },
        ]
    }
];
