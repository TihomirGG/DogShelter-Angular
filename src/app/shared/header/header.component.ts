import {
  AfterContentChecked,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
    userService.loggedState.subscribe((x) => {
      if (x) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isLogged) {
      this.userService.getLoggedIn.unsubscribe();
    }
  }

  ngOnInit() {
  }

  logout(): void {
    this.userService.logout();
  }

 
}
