import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFirestoreModule,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { storeData } from '../app/store/user-store/user.reducer';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [AppComponent, ],
  imports: [
    BrowserModule,
   
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    StoreModule.forRoot(storeData),
    UserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    HammerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
