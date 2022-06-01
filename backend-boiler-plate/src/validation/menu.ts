import * as yup from 'yup'
import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import Menu from '../models/menu'

export default {
    upsert: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const schema = yup.object().shape({
                name: yup.string().required().min(2),
                relatedId : yup.string(),
            })

            await schema.validate(req.body, { abortEarly: false })

            if(req.body.relatedId) {
                if (!mongoose.Types.ObjectId.isValid(req.body.relatedId))
                return res
                    .status(400)
                    .json({ message: 'RelatedId must be a valid MongoDB ObjectId' })

                const parentMenu = await Menu.findOne({ _id:  req.body.relatedId})

                if( !parentMenu ) 
                return res
                    .status(400)
                    .json({ message: 'RelatedId must exist in the database' })                
            }      
            
            const menuExists = await Menu.findOne({ name:  req.body.name})

            if( menuExists ) 
            return res
                .status(400)
                .json({ message: 'Menu with that name already exists' })
 
            return next()
        } catch (err) {
            const { errors } = err as yup.ValidationError
            return res.status(400).json({ messages: errors })
        }
    },
    objectId: async (req: Request, res: Response, next: NextFunction) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res
                .status(400)
                .json({ message: 'Id must be a valid MongoDB ObjectId' })
        
            const menu = await Menu.findOne({ _id:  req.params.id})

            if( !menu ) 
            return res
                .status(404)
                .json({ message: 'Menu not found' })

        return next()
    },
}