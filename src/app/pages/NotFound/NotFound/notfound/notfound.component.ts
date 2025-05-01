import { Component,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {
 
constructor(private router: Router){}
  
goToHome(): void {
  this.router.navigateByUrl('home');
}

}
