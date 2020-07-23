
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/login',
      component: '../pages/login',
      routes: [


      ]
    },
    {
      path: '/hello',
      component: '../pages/hello',
    }
    // {
    //   path: '/',
    //   component: '../layouts/index',
    //   routes: [
    //     {path: '/', component: '../pages/index'},
    //     {
    //       path: '/hello',
    //       component: '../pages/hello',
    //     },
    //     {
    //       path: '/login',
    //       component: '../pages/login',
    //     }

    //   ]
    // }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'cms-front',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
