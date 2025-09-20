const express=require('express')
const router=express.Router()
const Board=require('../models/Board')

// GET all boards
router.get('/',async(req,res)=>{
	try{
		const boards=await Board.find()
		res.json(boards)
	}catch(err){
		res.status(500).json({error:err.message})
	}
})

// POST create board
router.post('/',async(req,res)=>{
	try{
		const board=new Board({title:req.body.title})
		await board.save()
		res.status(201).json(board)
	}catch(err){
		res.status(500).json({error:err.message})
	}
})

// PUT update board
router.put('/:id',async(req,res)=>{
	try{
		const board=await Board.findByIdAndUpdate(req.params.id,{title:req.body.title},{new:true})
		if(!board) return res.status(404).json({message:'Board not found'})
		res.json(board)
	}catch(err){
		res.status(500).json({error:err.message})
	}
})

// DELETE board
router.delete('/:id',async(req,res)=>{
	try{
		const board=await Board.findByIdAndDelete(req.params.id)
		if(!board) return res.status(404).json({message:'Board not found'})
		res.json({message:'Board deleted'})
	}catch(err){
		res.status(500).json({error:err.message})
	}
})

module.exports=router
