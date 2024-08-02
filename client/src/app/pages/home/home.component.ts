import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,NgIf,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
