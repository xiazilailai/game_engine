import { defineConfig } from 'umi';
import path from 'path';

export default defineConfig({  
  alias: {
    '@pub': path.resolve(__dirname, './public')
  },
  layout: {
    name: 'Animation Lab', 
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      name: 'layout',
      component: '@/layouts/emptyLayout',
      menu: {
        flatMenu: true,
      },
      routes: [
        { 
          path: '/', 
          redirect: '/index',
          component: '@/pages/index',
        },
        { 
          path: '/index', 
          name: '欢迎',
          icon: 'smile',
          component: '@/pages/index',
        },
        { 
          path: '/dog', 
          name: '狗子',
          icon: 'smile',
          component: '@/pages/Dog/dog',
        },
        { 
          path: '/pixi', 
          name: 'PIXI 引擎',
          icon: 'smile',
          component: '@/pages/PIXI/index',
        },
        { 
          path: '/phaser', 
          name: 'Phaser 引擎',
          icon: 'smile',
          component: '@/pages/Phaser/Phaser',
        },
      ]
    }
  ],
});
