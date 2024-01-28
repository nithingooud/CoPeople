const express = require('express')
const { mongoose } = require('mongoose')
const app = express()
const PORT = 2000

mongoose.connect('mongodb://localhost:27017')

mongoose.connection.on('connected',()=>{
    console.log("mongo connected succesfully");
})

mongoose.connection.on('error',()=>{
    console.log("error connecting in mongo")
})

require('./models/User')
require('./models/Post')

app.use(express.json())

app.use(require('./routes/auth.route'))
app.use(require('./routes/post.route'))

const customMiddleware = (req,res,next) => {
    console.log("custom middleware");
    next()
}


app.get('/',(req,res)=>{
    console.log("home")
    res.send("Hello World")
})

app.get('/about',customMiddleware,(req,res)=>{
    console.log("about page")
    res.send("about page")
})

app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
})
