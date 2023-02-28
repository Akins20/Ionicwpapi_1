import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/auth.guard';

const routes: Routes = [{ path: '', redirectTo: 'post', pathMatch: 'full', },
{
  path: 'home',
  loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: 'posts',
  loadChildren: () => import('./posts/posts.module').then(m => m.PostsPageModule), canActivate: [AuthGuard]
},
{
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
},
{
  path: 'edit-posts',
  loadChildren: () => import('./edit-posts/edit-posts.module').then(m => m.EditPostsPageModule)
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
