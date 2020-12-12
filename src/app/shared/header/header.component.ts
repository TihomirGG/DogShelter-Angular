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
  sub: any;
  constructor(private userService: UserService, private router: Router) {
    this.isLogged = false;
    this.sub = this.userService.loggedState.subscribe((x) => {
      if (x === null) {
        this.isLogged = false;
      } else {
        this.isLogged = true;
      }
    });
  }

  ngOnDestroy(): void {
  
      this.sub.unsubscribe();
  }

  ngOnInit() {}

  logout(): void {
    this.userService.logout();
  }
}
