import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  matSnackBar = inject(MatSnackBar);
  open(message: string, title: string) {
    this.matSnackBar.open(message, title, {
      duration: 5_000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  handleHttpError() {
    this.open(`Ocorreu um erro, recarregue a pagina novamente!`, `Error`);
  }
}
