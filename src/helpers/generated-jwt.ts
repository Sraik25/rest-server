import { sign } from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY;

const generatedJWT = (uid: string) => {
  return new Promise<string | undefined>((resolve, reject) => {
    const payload = {
      uid,
    };

    sign(
      payload,
      secretKey ?? '',
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generatedJWT };
