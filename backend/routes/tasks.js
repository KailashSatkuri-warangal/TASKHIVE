const express=require('express')
const router=express.Router()
const Task=require('../models/Task')

// GET all tasks
router.get('/',async(req,res)=>{
	try{
		const tasks=await Task.find().populate('boardId')
		res.json(tasks)
	}catch(err){
		res.status(500).json({error:err.message})
	}
})

// GET tasks by board
router.get('/board/:boardId',async(req,res)=>{
	try{
		const tasks=await Task.find({boardId:req.params.boardId})
		res.json(tasks)
	}catch(err){
		res.status(500).json({error:err.message})
	}
})

// POST create task
router.post('/',async(req,res)=>{
	try{
		const {title,status,boardId,deadline}=req.body
		const task=new Task({title,status,boardId,deadline})
		await task.save()
		res.status(201).json(task)
	}catch(err){
		res.status(500).json({error:err.message})
	}
})

// PUT update task
router.put('/:id',async(req,res)=>{
	try{
		const {title,status,deadline}=req.body
		const task=await Task.findByIdAndUpdate(req.params.id,{title,status,deadline},{new:true})
		if(!task) return res.status(404).json({message:'Task not found'})
		res.json(task)
	}catch(err){
		res.status(500).json({error:err.message})
	}
})

// DELETE task
router.delete('/:id',async(req,res)=>{
	try{
		const task=await Task.findByIdAndDelete(req.params.id)
		if(!task) return res.status(404).json({message:'Task not found'})
		res.json({message:'Task deleted'})
	}catch(err){
		res.status(500).json({error:err.message})
	}
})

module.exports=router
