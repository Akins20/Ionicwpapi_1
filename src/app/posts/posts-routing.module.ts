import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsPage } from './posts.page';
import { EditPostsPage } from '../edit-posts/edit-posts.page';

const routes: Routes = [
  { path: '', component: PostsPage },
  { path: 'new', component: EditPostsPage },
  { path: 'edit', component: EditPostsPage },
  { path: ':id', component: PostsPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsPageRoutingModule { }