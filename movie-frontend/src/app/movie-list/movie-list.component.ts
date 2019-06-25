import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from './movie.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {

  movies: Movie[];
  errorMessage: string;
  isLoading: boolean = true;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService
      .getMovies()
      .subscribe(
        movies => {
          this.movies = movies;
          console.log(this.movies)
          this.isLoading = false;
        },
        error => this.errorMessage = <any>error
      );
  }

  findMovie(id): Movie {
    return this.movies.find(movie => movie.id === id);
  }

  isUpdating(id): boolean {
    return this.findMovie(id).isUpdating;
  }

  increaseRating(id, rating) {
    let movie = this.findMovie(id);
    movie.isUpdating = true;
    this.movieService
      .increaseRating({id, rating})
      .subscribe(
        response => {
          movie.rating = response.rating;
          movie.isUpdating = false;
        },
        error => {
          this.errorMessage = <any>error;
          movie.isUpdating = false;
        }
      );
  }

}
