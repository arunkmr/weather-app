const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express()
//DEFINE PATH FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partial')
//SETUP HANDLEBAR ENGINE AND VIEW LOCATION
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        description:"Om Namo Narayana",
        footer:"Arunkumar"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"Welcome",
        description:"Om Namo Narayana",
        footer:"Arunkumar"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Welcome",
        description:"Om Namo Narayana",
        footer:"Arunkumar"
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send([{
        Error:"You Must Provide a Query String"
       }]) 
    }
    res.send([{
        products:""
    }])
})


app.get('/help/*',(req, res)=>{
    res.render('404',{ 
        title:"404",
        name:"Arunkumar", 
        ErrorMessage:"404-page not found"
    })
})

/*
app.get('/help',(req, res)=>{
    res.send([{ name: 'Arun', age:36}, {name:'kumar', age:45}])
})

app.get('/about', (req, res)=>{
    res.send('<h2>Weather</h2>')
})

app.get('/weather',(req, res)=>{
    res.send([{ location:'philidophia', forecast:50 }])
})
*/

app.get('/weather',(req, res)=>{
   // console.log(req.query.address)
    if(!req.query.address){
        return res.send({error:"Please provide the proper address"})
    }
    else{
        geocode(req.query.address,(error, { Latitude, Longitude, PlaceName }={})=>{
            if(error){
                return res.send({error})
            }
            forecast(Latitude, Longitude,(error, forecastData)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    Latitude,
                    address:req.query.address
                })
                
            }) 
        }) 
    }
        
})

app.get('*',(req, res)=>{
    res.render('404',{
        ErrorMessage:"404-page not found"
    })
})




app.listen(port, ()=>{
    console.log('server is up on port'+ port)
})