# crud-sample-node-vue

Proje test staging url'i

aws Ec2 instance

http://ec2-35-159-25-42.eu-central-1.compute.amazonaws.com/

 "email":"johndoe@example.com",
 "password":"111111"

kullanıcı bilgileri olmak üzere, "johndoe1@example.com", "johndoe2@example.com" .... "johndoe11@example.com" e kadar 11 adet kullanıcı bulunmaktadır ve bunlardan 4 tanesi admin geriye kalanlar default kullanıcılardır
birinci yani "johndoe@example.com" kullanıcısı admindir.

Proje minimum vue3 gereksinimleri ile çalışmaktadır kullanılan toollar;

/stores -> Pinia (Store root klasörüdür ve 2 store modülünden oluşmaktadr)
 /stores -> auth
 /stores -> user
 
/router -> Vue router (Proje routelarnı içermektedir)
   {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/users',
      name: 'users',
      meta: {requiresAuth: true},
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UsersView.vue')
    }
    
Route yapısı toplam 3 route'tan oluşur anasayfa,login ve users.

    
