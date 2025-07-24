import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        components: {
          default: () => import('@/views/Home.vue'),
          header: () => import('@/components/Navbar.vue'),
          footer: () => import('@/components/footer/Footer.vue'),
        },
      },

      {
        path: 'detail/:id',
        name: 'detail',
        components: {
          default: () => import('@/views/DetailAnime.vue'),
          header: () => import('@/components/Navbar.vue'),
          footer: () => import('@/components/footer/Footer.vue'),
        },
      },

      {
        path: 'genre/:id',
        name: 'genre',
        components: {
          default: () => import('@/views/GenresAnime.vue'),
          header: () => import('@/components/Navbar.vue'),
          footer: () => import('@/components/footer/Footer.vue'),
        },
      },

      {
        path: 'section/:nameSection',
        name: 'sectionAnime',
        components: {
          default: () => import('@/views/SectionAnime.vue'),
          header: () => import('@/components/Navbar.vue'),
          footer: () => import('@/components/footer/Footer.vue'),
        },
      },

      {
        path: 'search/:searchAnime',
        name: 'searchAnime',
        components: {
          default: () => import('@/views/SearchAnime.vue'),
          header: () => import('@/components/Navbar.vue'),
          footer: () => import('@/components/footer/Footer.vue'),
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
