import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  @Post('register')
  async registerUser(@Body() userData): Promise<string> {
    // Guardar el usuario en la base de datos
    const { email, password } = userData;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      return 'El usuario ya está registrado';
    }

    const user = new User();
    user.email = email;
    user.password = password;

    await this.userRepository.save(user);

    return 'Usuario registrado exitosamente';
  }

  @Post('login')
  async loginUser(@Body() userData): Promise<any> {
    // Verificar el inicio de sesión del usuario
    const { email, password } = userData;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return 'El usuario no existe';
    }

    if (user.password !== password) {
      return 'Contraseña incorrecta';
    }
    const token = jwt.sign({ email: user.email, id: user.id }, 'secretKey', {
      expiresIn: '1h',
    });

    return {
      message: 'Inicio de sesión exitoso',
      token,
    };
  }
}
