# crud-sample-node-vue

# Proje test staging url'i

#aws Ec2 instance

## http://ec2-35-159-25-42.eu-central-1.compute.amazonaws.com/

Node express js framework ve minimal routing/middleware yapısı kullanılmıştır.
 
# Kurulum

## git clone https://github.com/boldness1/crud-sample-node-vue

## cd crud-sample-node-vue

## npm install

## npm start

## Postman kullanarak aşağıdaki url ve bilgiler ile yeni kullanıcı ekleyebilirsiniz

## localhost:3001/auth/register

{
    "firstname":"John",
    "lastname":"Doe",
    "email":"johndoe11@example.com",
    "password":"111111"
}

## app.js dosyası içerisinde proje routeları bulunmaktadır, auth routeları kayıt ve giriş aksiyonlarnı yaptığından middlware dışında bırakılmıştır.

   app.use('/auth', authRouter);
   app.use(authMiddleware);
   app.use('/', indexRouter);
   app.use('/users', usersRouter);

## 404 handler 

app.use(function(req, res, next) {

    res.status(404);

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

## routes -> auth / users / index 3 farklı route prefixi ile oluşmaktadır ve update / delete routeları  !! roleMiddleware !! kullanarak role based işlem yapılmasını sağlamaktadır.
    
 router.patch('/update',
    updateUserValidator(),
    roleMiddleware,
    async function(req, res, next) {

  return res.send(await updateUser(req.body) )

});

## services -> User -> index / authservice olarak iki service'den oluşmaktadır bu kısım proje routelarının içerisinde yalnızca temel / validasyon vb gibi parse işlemlernin yapılıp route dosyalarında fazla kodu önlemek amaçlıdır.

## validator -> login / register / remove / update olarak 4 total validator'den oluşmaktadır ve proje validasyonu için her ilgili route'ta çağrılmaktadır.

## app.use(cors()); aksiyonu projelerin ikiside aynı ec2 insance'ında bulunduğundan local istek gönderiminde cors block policy önlemek içindir.

## config/config.json sequelize default config dosyasıdır ve env bazlı configure edilebilir, local kurulum yapılacak ise NODE_ENV=development olmalıdır
## migrations/ proje migrationlarını barındırır.
## models database / model yapısı burda ilişkilendirilmitir.

# User modeli hasOne lişikisi ile Role modeline bağlıdır, bir kullanıcı eklendiğinde sequelize afterCreate hook'u kullanılarak 'default' rele'ü kullanıcıya atanır.
# beforeCreate ve beforeUpdate hookları'da ilgili model içerisinde configure edilmiştir bu sayede projede kullanılan bcrypt hash metodu gereksinimi sağlanır.

# User -> hasOne(Role,{foreignKey:"UserId"})    

  ##           firstName: DataTypes.STRING,
  ##           lastName: DataTypes.STRING,
  ##           email: {type:DataTypes.STRING,unique:true},
  ##           password: DataTypes.STRING,

Role modeli ise belongsTo ilişkilendirmesi ile User modeline bağlıdır.

# Role ->   
   ## UserId: DataTypes.INTEGER,
   ## role: DataTypes.STRING


