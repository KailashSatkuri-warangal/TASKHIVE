const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')

dotenv.config()
const app=express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
const boardRoutes=require('./routes/boards')
const taskRoutes=require('./routes/tasks')

app.use('/api/boards',boardRoutes)
app.use('/api/tasks',taskRoutes)

// Connect to MongoDB and start server
const PORT=process.env.PORT||5000

mongoose.connect(process.env.MONGO_URI,{
	useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(()=>{
	console.log('Connected to MongoDB')
	app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
})
.catch(err=>{
	console.error('MongoDB connection error:',err)
})