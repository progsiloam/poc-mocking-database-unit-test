import { getAccessToken, logger, verifyToken } from '@siloamhospitals/erp-template-expressjs-library';
import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { config } from '../config';
import type { UserData } from '../types/auth.type';
import type { CurrentUserInformationData } from '../types/user.type';

export const checkAuth = (canSkip: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'development') {
      logger.info('Authentication using development environment');

      const headerCurrentUser = req.get('X-CURRENT-USER');
      if (headerCurrentUser !== undefined && headerCurrentUser !== '') {
        const currentUser = JSON.parse(headerCurrentUser) as CurrentUserInformationData;
        if (currentUser.username && currentUser.role_ids) {
          req.user = { username: currentUser.username, role_ids: currentUser.role_ids };

          logger.info(`User '${JSON.stringify(req.user)}' is authenticated using development environment`);
          next();
        } else {
          next(createHttpError.Unauthorized('Unauthorized'));
        }
      } else {
        next(createHttpError.Unauthorized('Unauthorized'));
      }

      return;
    }

    try {
      const token = getAccessToken(req);
      const data = verifyToken<UserData>(token, config.jwt);
      req.user = data;
      next();
    } catch (error) {
      if (canSkip) {
        next();
      } else {
        next(createHttpError.Unauthorized('Unauthorized'));
      }
    }
  };
};

export const requireRoles = (roles: number[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      if (roles.some((role) => req.user?.role_ids.includes(role))) {
        next();
      } else {
        next(createHttpError.Forbidden('Forbidden'));
      }
    } else {
      next(createHttpError.Unauthorized('Unauthorized'));
    }
  };
};
