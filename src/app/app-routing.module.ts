import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ContactComponent } from './pages/contact/contact.component';
import { CreateUserComponent } from './pages/createuser/create-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenupageComponent } from './pages/menupage/menupage.component';
import { RomiesComponent } from './pages/romies/romies.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  // { path: 'menu/:id', component: MenupageComponent },
  { path: 'menupage/:id', component: MenupageComponent },
  { path: 'romies', component: RomiesComponent },
  { path: 'contact/:id', component: ContactComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createuser', component: CreateUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
