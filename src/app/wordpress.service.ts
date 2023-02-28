import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  updatePost: any;
  createPost: any;
  deletePost: any;
  getMedia: any;
  post: any;

  constructor() { }
  getPost(id: any): Observable<any[]> {
    return this.post.get()
      .map((res: { json: () => any; }) => res.json())
      .map((data: any) => {
        var posts = [];
        for (let post of data) {
          let onePost = new post(post['author'], post['id'], post['title']['rendered'], post['content']['rendered'], post['excerpt']['rendered'], post['date'], post['featured_media']);
          onePost.media_url = this.getMedia(onePost.mediaId);
          posts.push(onePost);
        }
        return posts;
      });
  }

}

