import { AfterContentChecked, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnDestroy, OnInit {
  isLogged: Boolean;
  constructor(private userService: UserService, private router: Router) {
    this.isLogged = false;
    userService.getLoggedIn.subscribe( (x :Boolean)=> this.change(x) )
  }

  ngOnDestroy(): void {
    if(this.isLogged){
      this.userService.logout();
      this.userService.getLoggedIn.unsubscribe();
    }
  }
  
  ngOnInit(){
    this.userService.logout();
  }
 

  logout(): void {
    this.userService.logout();
  }

  change(info: Boolean){
    this.isLogged = info;
  }
}
