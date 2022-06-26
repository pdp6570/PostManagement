import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://jsonplaceholder.typicode.com/posts';
  private urlComments = 'http://jsonplaceholder.typicode.com/comments';

  constructor(private httpClient: HttpClient) { }

  getPosts(){
    return this.httpClient.get(this.url);
  }

  getPostById(postId: any): Observable<any> {
    return this.httpClient.get(this.url + "/" + postId);
  }

  deletePost(postId: any) {
    return this.httpClient.delete(this.url + '/' + postId);
  }

  getComments(postId: any) {
    return this.httpClient.get(this.url + "/" + postId + "/comments");
  }

  savePostDetails(postObj:any) {
    return this.httpClient.put(this.url + "/" + postObj.id, postObj);
  }

  getAllComments() {
    return this.httpClient.get(this.urlComments);
  }
}
