import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http
      .post<any>('http://localhost:3000/users/login', loginData)
      .subscribe(
        (response) => {
          // Inicio de sesión exitoso, realizar acciones adicionales si es necesario
          console.log('Inicio de sesión exitoso:', response);
        },
        (error) => {
          // Error durante el inicio de sesión, manejar el error de acuerdo a tus necesidades
          console.error('Error durante el inicio de sesión:', error);
        }
      );
  }
}
