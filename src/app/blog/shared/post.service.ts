import { Post } from './../models/Post';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:3000/blogs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts;
  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
        // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPosts (): Observable<Post[]> {
    return this.http.get<Post[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched posts')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id: number): Observable<Post> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => console.log(`fetched post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }
  
  addPost (post): Observable<Post> {
    return this.http.post<Post>(apiUrl, post, httpOptions).pipe(
      tap((post: Post) => console.log(`added post w/ id=${post.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }
  
  updatePost (id, post): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, post, httpOptions).pipe(
      tap(_ => console.log(`updated post id=${id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }
  
  deletePost (id): Observable<Post> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Post>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

}
