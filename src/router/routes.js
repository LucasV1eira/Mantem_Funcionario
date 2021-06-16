
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/HomePage.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/cadastro', component: () => import('src/pages/mant_func/cadastro.vue') },
      { path: '/cadastro-form', component: () => import('src/pages/mant_func/cadastro-form.vue') },
      {
        path: '/altera-form',
        name: 'alterar',
        component: () => import('src/pages/mant_func/altera-form.vue'),
        data(){
          return {
            matriculaC: 'teste',
            nomeC: null,
            cargoC: null,
            autorizanteC: null,
            situacaoC: null,
          }
        },
        created(){
    
        }
      },
    ],
    props: true
  },
  


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
