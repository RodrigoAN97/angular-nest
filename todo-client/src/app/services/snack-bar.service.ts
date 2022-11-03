import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  success(message: string) {
    this._snackBar.open(message, 'SUCCESS', { duration: 3000, panelClass: 'success-snackbar' });
  }

  error(message: string) {
    this._snackBar.open(message, 'ERROR', { duration: 3000 });
  }
}
