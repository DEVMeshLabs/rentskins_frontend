import jwt from 'jsonwebtoken'

export default class JsonWebToken {
  public static create(item: object) {
    return jwt.sign(item, process.env.NEXT_PUBLIC_SECRET_KEY as string)
  }

  public static decode(jasonWebToken: string) {
    return jwt.decode(jasonWebToken)
  }

  public static verify(token: string): object {
    try {
      return jwt.verify(
        token,
        process.env.NEXT_PUBLIC_SECRET_KEY as string,
      ) as object
    } catch (err) {
      return {
        error: 'Token de autorização não fornecido',
        message:
          'Por favor, forneça um token de autorização válido na solicitação.',
        status_code: 401,
      }
    }
  }
}
