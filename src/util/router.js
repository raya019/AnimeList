import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('@/views/Home.vue'),
  // },

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
        path: '/detail/:id(\\d+)',
        name: 'detail',
        components: {
          default: () => import('@/views/DetailAnime.vue'),
          header: () => import('@/components/Navbar.vue'),
          footer: () => import('@/components/footer/Footer.vue'),
        },
        props: true,
      },

      {
        path: 'genre/:id(\\d+)',
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
    ],
  },

  // {
  //   name: 'detail',
  //   path: '/detail/:id(\\d+)',
  //   component: () => import('@/views/DetailAnime.vue'),
  //   props: true,
  // },

  // {
  //   name: 'genre',
  //   path: '/genre/:id',
  //   component: () => import('@/views/GenresAnime.vue'),
  // },

  // {
  //   name: 'sectionAnime',
  //   path: '/anime/:nameSection',
  //   component: () => import('@/views/SectionAnime.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
