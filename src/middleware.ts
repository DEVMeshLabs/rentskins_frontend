export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/inventario/:path*',
    '/pagamento/:path*',
    '/usuario/:path*',
    '/admin/:path*',
    '/atividade-suspensa',
  ],
}
