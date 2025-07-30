import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {

const router = inject(Router)

const Id = inject(PLATFORM_ID)


if (isPlatformBrowser(Id)) {
    if (localStorage.getItem('myToken') !== null) {
        router.navigate(['/home'])
    return false
  } else {
    return true
  }
} else {
  return false
}
};
