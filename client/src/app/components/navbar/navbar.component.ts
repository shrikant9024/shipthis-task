import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgModel, FormsModule } from '@angular/forms'; // Import FormsModule for NgModel
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule,NgClass], // Import FormsModule for NgModel
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() navClick = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  activeLink: string = 'home';
  searchItem: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Optionally, set the active link based on the current route
    this.activeLink = this.router.url.substring(1) || 'home'; // Ensure 'home' is the default
  }

  onNavClick(type: string, link: string): void {
    this.navClick.emit(type);  // Emit the navigation event if needed
    this.activeLink = link;    // Update the active link for styling
    this.router.navigate([`/${link}`]);  // Navigate to the selected route
  }

  onSearch(): void {
    if (this.searchItem.trim()) {
      this.search.emit(this.searchItem.trim());
    }
  }
}
