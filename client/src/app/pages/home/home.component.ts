import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { NgFor, NgIf } from '@angular/common';
import { MoviesService } from '../../service/movies.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor, TruncatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  errorMessage: string = '';

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    // Load all movies by default
    this.loadMovies('all');
  }

  onNavClick(type: string): void {
    if (type === 'all') {
      this.loadMovies('all'); // Load all movies
    } else {
      this.loadFilteredMovies(type); // Load filtered movies based on type
    }
  }

  loadMovies(type: string): void {
    if (type === 'all') {
      // Fetch all movies
      this.moviesService.getMovies("movies").subscribe({
        next: (data) => this.movies = data.slice(0, 15),
        error: (err) => this.errorMessage = 'Failed to load movies'
      });
    }
  }

  loadFilteredMovies(type: string): void {
    this.moviesService.filterMovies(type).subscribe({
      next: (data) => this.movies = data.slice(0, 15),
      error: (err) => this.errorMessage = 'Failed to load movies'
    });
  }
}
