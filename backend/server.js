const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')

dotenv.config()
const app=express()
console.log("MONGO_URI:",process.env.MONGO_URI)

app.use(express.json())
app.use(morgan('dev'))

const allowedOrigins=[
	'http://localhost:5173',
	'https://kailashsatkuri-warangal.github.io'
]

app.use(cors({
	origin:function(origin,callback){
		if(!origin) return callback(null,true)
		if(allowedOrigins.indexOf(origin)===-1){
			const msg='CORS blocked: This origin is not allowed -> '+origin
			return callback(new Error(msg),false)
		}
		return callback(null,true)
	},
	credentials:true
}))

const boardRoutes=require('./routes/boards')
const taskRoutes=require('./routes/tasks')

app.use('/api/boards',boardRoutes)
app.use('/api/tasks',taskRoutes)

app.get('/',(req,res)=>{
	res.send('✅ TaskHive Backend is running!')
})

const PORT=process.env.PORT||5000
mongoose.connect(process.env.MONGO_URI,{
	useNewUrlParser:true,
	useUnifiedTopology:true
})
.then(()=>{
	console.log('✅ Connected to MongoDB')
	app.listen(PORT,()=>console.log(`🚀 Server running on port ${PORT}`))
})
.catch(err=>console.error('❌ MongoDB connection error:',err))
