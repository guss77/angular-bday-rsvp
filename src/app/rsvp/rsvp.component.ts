import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule,
  ],
  templateUrl: './rsvp.component.html',
  styleUrl: './rsvp.component.scss',
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ]
})
export class RsvpComponent {

  rsvpform = this.fb.group({
    name: '',
    count: 0
  });

  constructor(private fb: FormBuilder, private http:HttpClient, private router:Router) { }

  get isDesktop(): boolean {
    switch (screen.orientation.type) {
      case 'portrait-primary':
        return false;
      case 'landscape-primary':
      default:
        return true;
    }
  }

  onSubmit(): void {
    if (!this.rsvpform.valid)
      return;
    let baseurl = '';
    if (window.location.hostname === 'localhost')
      baseurl = 'https://daniel.geek.co.il/submit.php';
    console.debug('Your order has been submitted', this.rsvpform.value, this.rsvpform.valid);
    this.http.post(`${baseurl}/submit.php`, this.rsvpform.value).subscribe((data) => {
      console.debug('Response from server', data);
      this.router.navigate(['/thankyou']);
    });
  }

}
