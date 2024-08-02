import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { NgFor, NgIf } from '@angular/common';
import { MoviesService } from '../../service/movies.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, NgIf, NgFor, TruncatePipe,RouterLink,MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  errorMessage: string = '';
  pageSize:number=15;
  pageIndex:number=0;
  totalMovies:number=0;

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

  onPageChange(event:PageEvent):void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMovies('all')
  }

  loadMovies(type: string): void {
    if (type === 'all') {
      // Fetch all movies
      this.moviesService.getMovies("movies").subscribe({
        next: (data) => {
          this.totalMovies = data.length;
          this.movies = data.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
        },
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

  handleSearch(keyword:string):void{
    this.movies = [];
    this.moviesService.searchMovies(keyword).subscribe(data=>{
      this.movies=data;
      
    },
  error=>{
    console.error('Error during search:',error);
    this.errorMessage = 'Failed to fetch search results'
    this.movies= []
  }
);
}
}

