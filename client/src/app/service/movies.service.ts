import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl = "http://localhost:8000"

  constructor(private http:HttpClient) {}
  getMovies(name:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${name}`)
  }
  filterMovies(type: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/filter?type=${encodeURIComponent(type)}`);
  }


  getMovieById(id: string): Observable<any> { 
    return this.http.get<any>(`${this.baseUrl}/movies/${id}`);
  }

  searchMovies(title:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/search?title=${title}`)
  }

}
