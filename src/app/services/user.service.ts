import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl='https://reqres.in';
  users: BehaviorSubject<Array<User>>;

  constructor(private httpClient:HttpClient ) { 
    this.users = new BehaviorSubject<Array<User>>([]);

  }
  getUsers(): Observable<Array<User>>{
    return this.httpClient.get(this.apiUrl+ '/api/users')
    .pipe(
      map((res:any)=>{
        const arrayUsers=res.data.map((item: { id: number; email: string; first_name: string; last_name: string; avatar: string; })=>{
          return new User(item.id, item.email,item.first_name,item.last_name,item.avatar);
        });
        this.users.next(arrayUsers);
        return this.users.getValue();
      }
      
    )
    )
  }


}
