// import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { AuthGuard } from './AuthGuard';
//
// @Injectable()
// export class PermissionsGuard implements CanActivate {
//     constructor(private reflector: Reflector) {}
//
//     canActivate(context: ExecutionContext): boolean {
//         const requiredPermission = this.reflector.get<PermissionType>('permission', context.getHandler());
//         if (!requiredPermission) {
//             return true; // No permission required for this route
//         }
//
//         const request = context.switchToHttp().getRequest();
//         const user = request.user;
//
//         if (!user || !AuthGuard.checkPermissions(user, requiredPermission)) {
//             throw new ForbiddenException('Insufficient permissions');
//         }
//         return true;
//     }
// }
