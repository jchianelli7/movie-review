import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {RequestOptions} from "@angular/http";


export interface Movie {
  id: Number,
  title: String,
  rating: Number,
  isUpdating: boolean
}

const routes = {
  movies: () => `http://localhost:8000/movies`,
  rating: () => 'http://localhost:8000/movies/rating'
};

export interface MovieContext {
  id: Number;
  rating: Number;
}

export interface NewMovieContext {
  title: String;
  rating: Number;
}

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private headers;


  constructor(private httpClient: HttpClient) {
    this.init();
  }

  async init() {
    // Set headers or do whatever else you want
  }

  getMovies(): Observable<Movie[]> {
    return this.httpClient
      .get(routes.movies())
      .pipe(
        map((body: any) => { // body
          let modifiedResult = body;
          modifiedResult = modifiedResult.map(function (movie) {
            movie.isUpdating = false;
            return movie;
          });
          return modifiedResult;
        }),
        catchError(() => of('Error, could not get movies'))
      );
  }

  changeRating(context: MovieContext) {
    return this.httpClient
      .post(routes.rating(),
        'id=' + context.id +
        '&rating=' + context.rating,
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }
      )
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not increase rating'))
      );
  }

  addMovie(context: NewMovieContext): Observable<Movie> {
    return this.httpClient
      .post(routes.movies(), 'title=' + context.title +
        '&rating=' + context.rating, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      })
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not add movie'))
      );
  }

}
