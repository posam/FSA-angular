import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { InitialsPipe } from './initials-pipe';
import { Language, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    InitialsPipe,
  ],
  templateUrl: './app.html',
})
export class App {
  private userService = inject(UserService);

  protected collapsed = true;
  protected readonly user = this.userService.getUser();

  private translate = inject(TranslateService);
  private langs = ['sk', 'en'];

  protected lang = signal(this.translate.getCurrentLang());
  protected langOptions = computed(() => {
    return this.langs.filter((lang) => lang !== this.lang());
  });

  protected setLang(lang: Language) {
    this.translate.use(lang);
    this.lang.set(lang);
  }

  protected logout() {
    this.userService.logout();
  }

  protected login() {
    this.userService.login();
  }
}
