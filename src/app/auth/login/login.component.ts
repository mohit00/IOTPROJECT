import { Component } from '@angular/core';
import { NbLoginComponent , NbAuthResult} from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends NbLoginComponent {
  res: any = {};
  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.res = result['response'];
        this.submitted = false;
       if (this.res.body.status) {
        this.messages = this.res.body.message;
      }else{
        this.errors = this.res.body.message;

      }
      const redirect = result.getRedirect();
      if (this.res.body.status) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }
}
