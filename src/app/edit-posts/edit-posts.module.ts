import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { EditPostsPageRoutingModule } from './edit-posts-routing.module';

import { EditPostsPage } from './edit-posts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPostsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditPostsPage]
})
export class EditPostsPageModule { }
