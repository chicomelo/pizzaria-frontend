# Sistema de Pedidos - Web App

Este projeto é um sistema web para gerenciamento de pedidos em bares, pizzarias e outros estabelecimentos, permitindo o registro e controle de pedidos por mesa.

## 🚀 Tecnologias Utilizadas

- Next.js (App Router)
- TypeScript
- Axios (consumo da API)
- cookies-next (gerenciamento de cookies no client/server)
- Toastify (notificações)
- SCSS Modules (estilização)
- API Backend (ex: Express, Fastify ou similar)

## 📂 Estrutura do Projeto

```
/app
  /dashboard
    /category
      page.tsx
      styles.module.scss
      /components
        CategoryForm.tsx
        action.ts
    /components
      header
        index.tsx
        styles.module.scss
      button
        index.tsx
        styles.module.scss
    page.tsx
  /login
    page.tsx
  /register
    page.tsx
/public
  logo.svg
/src
  /services
    api.ts
  /helpers
    ToastifyHelper.ts
  /lib
    cookieServer.ts
/styles
  globals.scss
```

## ⚙️ Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure variáveis de ambiente:**

   Crie um arquivo `.env.local` na raiz:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3333
   NODE_ENV=development
   ```

4. **Rode o projeto em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

## 💡 Como funciona

- Login → gera token e salva em cookie
- Dashboard → tela principal após login
- Cadastro de categorias → página de `/dashboard/category` com Toastify para feedback
- Logout → limpa cookie e redireciona para home

## ✨ Melhorias futuras (ideias)

- Sistema de pedidos por mesa
- Integração com impressão na cozinha
- Painel de administração (usuários, produtos)
- Responsividade mobile

---

🧡 Feito com dedicação para estudo e prática!
