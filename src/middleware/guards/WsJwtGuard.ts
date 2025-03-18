import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/routes/auth/auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client = context.switchToWs().getClient();
        const token = client.handshake.query.token;

        if (!token) return false;

        const user = await this.authService.authorize(token);
        if (!user) return false;

        (client as any).user = user;
        return true;
    }
}
