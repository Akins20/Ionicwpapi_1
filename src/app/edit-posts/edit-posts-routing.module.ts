import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPostsPage } from './edit-posts.page';

const routes: Routes = [
  {
    path: '',
    component: EditPostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPostsPageRoutingModule {}
