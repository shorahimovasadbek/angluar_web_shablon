import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth } from '@core/auth/auth';

export const authGuard: CanMatchFn = () => inject(Auth).isAuthed() || inject(Router).createUrlTree(['/login']);

export const guestGuard: CanMatchFn = () => !inject(Auth).isAuthed() || inject(Router).createUrlTree(['/home']);
