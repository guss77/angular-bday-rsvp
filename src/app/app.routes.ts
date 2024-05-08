import { Routes } from '@angular/router';
import { RsvpComponent } from './rsvp/rsvp.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

export const routes: Routes = [
  { path: 'thankyou', component: ThankyouComponent },
  { path: '**', component: RsvpComponent },
];
