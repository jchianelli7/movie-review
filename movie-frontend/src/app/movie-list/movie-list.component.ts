import {Component, OnInit} from '@angular/core';
import {Movie, MovieService} from './movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {

  movies: Movie[];
  errorMessage: string;
  isLoading: boolean = true;

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService
      .getMovies()
      .subscribe(
        movies => {
          this.movies = movies;
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
    rating = parseFloat(rating) + parseFloat(String(0.1));
    rating = parseFloat(rating).toFixed(2)
    let movie = this.findMovie(id);
    movie.isUpdating = true;
    this.movieService
      .changeRating({id, rating})
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

  decreaseRating(id, rating) {
    rating = parseFloat(rating) - parseFloat(String(0.1));
    rating = parseFloat(rating).toFixed(2)
    let movie = this.findMovie(id);
    movie.isUpdating = true;
    this.movieService
      .changeRating({id, rating})
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
