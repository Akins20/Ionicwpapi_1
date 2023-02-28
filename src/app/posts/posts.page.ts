import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from '../wordpress.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit, OnDestroy {
  post: any;
  postSub!: Subscription;
  loadMorePost: any;
  totalPost: any;
  edit: any;
  getMedia: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private wordpress: WordpressService
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.postSub = this.wordpress.getPost(id).subscribe((data: any) => {
      this.post = data;
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}