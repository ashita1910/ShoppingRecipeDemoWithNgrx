import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() selectedPage = new EventEmitter();
  userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    public dataService: DataStorageService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.auth.user.subscribe((user: User) => {
      this.isAuthenticated = user == null ? false : true;
    });
  }

  onSelected(name) {
    this.selectedPage.emit(name);
  }

  onLogout() {
    this.auth.logout();
  }

  saveRecipes() {
    this.dataService.storeRecipes();
  }

  fetchRecipes() {
    this.dataService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
