// import { NextResponse } from 'next/server'

// export function middleware(request) {
//     const path = request.nextUrl.pathname

//     const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

//     const token = request.cookies.get('token')?.value || ''

//     console.log('Path:', path);
//     console.log('Token:', token);

//     if(isPublicPath && token) {
//       console.log('Redirecting authenticated user to home');
//       return NextResponse.redirect(new URL('/', request.nextUrl))
//     }

//     if (!isPublicPath && !token) {
//       console.log('Redirecting unauthenticated user to login');
//       return NextResponse.redirect(new URL('/login', request.nextUrl))
//     }

//     return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/',
//     '/profile',
//     '/login',
//     '/signup',
//     '/verifyemail'
//   ]
// }



import { NextResponse } from 'next/server';

export function middleware(request) {
    // Obtém o caminho da URL
    const path = request.nextUrl.pathname;

    // Define as rotas públicas que não precisam de autenticação
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';

    // Obtém o token do cookie
    const token = request.cookies.get('token')?.value || '';

    // Adiciona logs para depuração
    console.log('Middleware executed');
    console.log('Path:', path);
    console.log('Token:', token);

    // Redireciona usuários autenticados para a página inicial se tentarem acessar uma rota pública
    if (isPublicPath && token) {
        console.log('Redirecting authenticated user to home');
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redireciona usuários não autenticados para a página de login se tentarem acessar uma rota privada
    if (!isPublicPath && !token) {
        console.log('Redirecting unauthenticated user to login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Continua com a requisição se todas as verificações passarem
    return NextResponse.next();
}

export const config = {
    // Define quais rotas o middleware deve aplicar
    matcher: ['/', '/profile', '/login', '/signup', '/verifyemail'],
};
