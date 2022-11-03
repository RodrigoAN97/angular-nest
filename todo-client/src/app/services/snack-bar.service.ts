import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  successSnackBar(message: string) {
    this._snackBar.open(message, 'SUCCESS', { duration: 3000, panelClass: 'success-snackbar' });
  }

  errorSnackBar(message: string) {
    this._snackBar.open(message, 'ERROR', { duration: 3000 });
  }
}
