import { RequestHandler } from "express";
import { db } from "../libs/prisma";


export const createTask:RequestHandler = async(req,res)=>{
    if(req.body.title){
        let todo = await db.todo.create({
            data:{
                title: req.body.title,
                done: req.body.done ? true : false
            }
        })
        
        res.status(201).json({todo:todo})
    }
    res.status(401).json({error:'tarefa não adicionada'})
}

export const getAllTask:RequestHandler = async(req,res)=>{
    const tasks = await db.todo.findMany({
        select:{
            id:true,
            title:true,
            done:true
        }
    })

    res.json({tasks})
}

export const UpdateTask:RequestHandler= async(req,res)=>{
    const id = parseInt(req.query.id as string, 10); 

    if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

    try {
    const updateUser = await db.todo.update({
      where: {
        id: id 
      },
      data: {
        title: req.body.title
      }
    });

    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa' });
  }
}

export const removeTask:RequestHandler = async(req,res)=>{
    const id = parseInt(req.params.id as string,10)

    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }

    
      try {
        await db.todo.delete({
            where:{
                id:id
            }
        })
    
        res.status(200).json({});
      } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar tarefa' });
      }
}