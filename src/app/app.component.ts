import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
 usersSubscription!: Subscription;
 users: Array<User> = [];
 constructor(private userService: UserService) {

 }
 
 ngOnInit(): void {
   this.usersSubscription=this.userService.getUsers().subscribe((users:Array<User>)=>this.users=users);
 }
 ngOnDestroy(): void {
   this.usersSubscription.unsubscribe();
 }
}
