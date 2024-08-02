import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  @Output() navClick = new EventEmitter<string>();
  activeLink : string = "home";

  constructor(private router:Router) {
    
  }

  onNavClick(type: string, link: string): void {
    this.navClick.emit(type);  // Emit the navigation event if needed
    this.activeLink = link;    // Update the active link for styling
    this.router.navigate([`/${link}`]);  // Navigate to the selected route
  }

  
}
