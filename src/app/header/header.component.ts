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
import * as fromApp from '../store/app.reducer';
import { DataStorageService } from '../shared/data-storage.service';
import { Store } from '@ngrx/store';

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
    private auth: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store.select('auth').subscribe((state) => {
      this.isAuthenticated = state?.user == null ? false : true;
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
