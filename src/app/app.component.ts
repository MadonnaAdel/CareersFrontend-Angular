
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/NavBar/nav-bar/nav-bar.component'
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavBarComponent,
    ReactiveFormsModule,
    HttpClientModule,
    FooterComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Careers-Angular-Dashboard";
  hideFooter: boolean = false;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.hideFooter = this.router.url.startsWith('/Company');
    });
  }
}
