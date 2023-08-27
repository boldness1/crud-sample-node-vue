

const roleMiddleware = function (req, res, next) {
    // console.log(req.user)
    if(req.user.role === "admin" )
        next();
    else
    return res.send({message:"Kullanıcı bu işlemi yapmak için yetkili değildir."})
}


module.exports = roleMiddleware;
