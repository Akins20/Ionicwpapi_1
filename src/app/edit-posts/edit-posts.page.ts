import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { WordpressService } from '../wordpress.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-posts.page.html',
  styleUrls: ['./edit-posts.page.scss'],
})
export class EditPostsPage implements OnInit, OnDestroy {
  form!: FormGroup;
  post: any;
  postSub!: Subscription;
  fileToUpload: any = null;
  maxDate!: Date;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private common: CommonService,
    private wordpress: WordpressService
  ) { this.createForm(); }

  ngOnInit() {
    /** Get post date on edit mode */
    if (this.router.getCurrentNavigation()!.extras.state) {
      const state: any = this.router.getCurrentNavigation()!.extras.state;
      this.post = state['post'] ? JSON.parse(state['post']) : '';
    }
    if (this.post) {
      this.form.patchValue({
        title: this.post.title.rendered,
        date: this.post.date,
        content: this.post.content.rendered,
      });
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      date: [dayjs().format()],
      content: ['', Validators.required],
      status: 'publish',
    });
  }

  submit(form: any) {
    if (!this.form.valid) {
      this.common.showToast('Please fill all required field', 'error');
      return;
    }
    if (this.post) {
      /** Edit mode */
      for (const key in form) {
        if (form.hasOwnProperty(key)) {
          this.post[key] = form[key];
        }
      }
      this.wordpress.updatePost(this.post.id, this.post)
        .subscribe(() => {
          this.common.showToast('Update post successful', 'success');
          this.router.navigateByUrl('/posts');
        });
    } else {
      /** New post */
      this.wordpress.createPost(this.form.value)
        .subscribe(() => {
          this.common.showToast('Post add successful', 'success');
          this.router.navigateByUrl('/posts');
        });
    }
  }

  delete() {
    this.postSub = this.wordpress.deletePost(this.post.id).subscribe(() => {
      this.common.showToast('Delete post successful', 'success');
      this.router.navigateByUrl('');
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}