import express from 'express'

const app = express()
const PORT = 5000
app.use(express.json())


app.get('/',(req,res)=>{
    res.json({
        message:"hello from express"
    })
})

app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})