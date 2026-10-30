import express from 'express'
import session from 'express-session'
const app = express();
import dotenv from 'dotenv'
dotenv.config();
const PORT =  process.env.PORT;

app.use(session({
    secret: 'process.env.Session_Secret',
    resave : false,
    saveUninitialized : false,
    cookie:{
        maxAge : 1000 * 60 * 2,
        httpOnly: true,
        sameSite: 'strict'
    }
}))

//home page
app.get('/',(req,res)=>{
    res.send('home page')
})

//get session
app.get('/login',(req,res)=>{
    req.session.username = "maharij";
    res.send('cookie has been set successfully')
})
//protected route
app.get('/profile',(req,res)=>{
    const username = req.session.username;
    if(!req.session.username){
        res.status(404).send('please login to website')
    }else{
        res.status(200).send(`session form username ${username}`)
    }
})

app.get('/logout',(req,res)=>{
    const username = req.session?.username;
    console.log(username)
    req.session.destroy((err)=>{
        if(err){
        return res.send('you cant not logout')
        }
        res.clearCookie('connect.sid')
            res.send(`you logout successfully ${username}`)
        
    })
})

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})