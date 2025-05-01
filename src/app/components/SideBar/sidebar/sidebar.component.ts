import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OnInit
  
 } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../services/auth-service.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class CompanySidebarComponent implements OnInit {
  ngOnInit(): void {}
  activeItem: string = 'dashboard';
  @Input() activee!: string;
  showPopup: boolean = false;

  constructor(private router: Router, private authService: AuthServiceService) {
    this.activeItem = this.activee;
  }

  handleItemClick( path: string) {
    this.router.navigate([path]);
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  logOut()
  {
    localStorage.clear();
    this.router.navigate(["/home"])
  }
}