import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


export interface Movie {
  id: Number,
  title: String,
  rating: Number,
  isUpdating: boolean
}

const routes = {
  movies: () => `http://localhost:8000/movies/`,
};

export interface MovieContext {
  id: Number;
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

  increaseRating(context: MovieContext) {
    return this.httpClient
      .post(routes.movies() + context.id + '/rating',
        'rating=' + context.rating,
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }
      )
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not increase rating'))
      );
  }

}
