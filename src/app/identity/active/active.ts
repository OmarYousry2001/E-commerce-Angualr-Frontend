import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from '../identity-service';
import { ToastrService } from 'ngx-toastr';
import { ActiveAccount } from '../../shared/Models/ActiveAccount';

@Component({
  selector: 'app-active',
  standalone: false,
  templateUrl: './active.html',
  styleUrl: './active.scss'
})
export class Active implements AfterViewInit {

  activateParam = new ActiveAccount();

  constructor(
    private _activateRouted: ActivatedRoute,
    private _identityService: IdentityService,
    private _toast: ToastrService,
    private route: Router
  ) {}

  ngAfterViewInit(): void {
    this._activateRouted.queryParamMap.subscribe((params) => {
      this.activateParam.userId = params.get('userId') || '';
      this.activateParam.code = params.get('code') || '';


        if (this.activateParam.userId && this.activateParam.code) {
      this._identityService.activateAccount(this.activateParam).subscribe({
      next: (res) => {
        console.log(res);
        this._toast.success('Your account is active', 'SUCCESS');
        this.route.navigateByUrl('/account/Login');
      },
      error: (err) => {
        console.log(err);
        this._toast.error('Activation failed: ' + err.message);
      },
    });
  }
    });

 
  }

}
