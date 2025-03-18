
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from '../../modules/utils/entityServices/users.service';
import { User } from '../../entities/User';
import { getConfig } from '../../config/envConfig';
import { IJWTBody } from '../../modules/routes/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        //console.log(`TOKEN`, request.headers)
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: getConfig().JWT_SECRET}) as IJWTBody;
            const user = await User.findOneBy({id: payload.id});
            if(!user) throw new UnauthorizedException();
            request.user = user as User;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    // public static checkPermissions(user: User, requiredPermission: PermissionType): boolean {
    //     return (user.permissions & requiredPermission) === requiredPermission;
    // }
}
