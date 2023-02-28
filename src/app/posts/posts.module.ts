import { CommonService } from './../common.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PostsPageRoutingModule } from './posts-routing.module';
import { PostsPage } from './posts.page';
import { EditPostsPage } from '../edit-posts/edit-posts.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PostsPageRoutingModule
  ],
  declarations: [PostsPage],
  providers: [CommonService]
})
export class PostsPageModule { }