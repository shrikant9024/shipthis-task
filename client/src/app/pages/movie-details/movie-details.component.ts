import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../service/movies.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [NavbarComponent,NgIf,],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent  {
  movie:any;
  errorMessage:string| null= null

  constructor(private route:ActivatedRoute,
    private movieService: MoviesService
  ){}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe(
        data => this.movie = data,
        error => this.errorMessage = 'Failed to load movie details'
      );
    }
  }
}
