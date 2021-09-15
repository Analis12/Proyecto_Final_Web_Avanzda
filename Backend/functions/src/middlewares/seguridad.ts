import { Request, Response } from "express";
import * as admin from 'firebase-admin'

export async function estaAutenticado(req: Request, res: Response, next: Function) {
   const { authorization } = req.headers

   if (!authorization)
       return res.status(401).send({ message: 'No Autorizado' });

   if (!authorization.startsWith('Bearer'))
       return res.status(401).send({ message: 'No Autorizado' });

   const split = authorization.split('Bearer ')
   if (split.length !== 2)
       return res.status(401).send({ message: 'No Autorizado' });

   const token = split[1]

   try {
       const decodedToken: admin.auth.DecodedIdToken = await admin.auth().verifyIdToken(token);
       res.locals = { ...res.locals, uid: decodedToken.uid, rol: decodedToken.rol, email: decodedToken.email }
       return next();
   }
   catch (err) {
       console.error(`${err.code} -  ${err.message}`)
       return res.status(401).send({ message: 'No Autorizado' });
   }
}
export function estaAutorizado(opts: { hasRole: Array<'encargado' | 'cliente'>, allowSameUser?: boolean }) {
  return (req: Request, res: Response, next: Function) => {
      const { rol, uid } = res.locals
      const { id } = req.params

      if (opts.allowSameUser && id && uid === id)
          return next();

      if (!rol)
          return res.status(403).send({ message: 'Prohibido el acceso' });

      if (opts.hasRole.includes(rol))
          return next();

      return res.status(403).send();
  }
}