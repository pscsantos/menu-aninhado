import { Request, Response } from 'express'
import Menu from '../models/menu'
import menuService from '../services/menu.service'

export default {
    create: async (req: Request, res: Response): Promise<Response> => {
        const { id } = await Menu.create(req.body)

        return res.status(201).json({
            id,
        })
    },
    getOne: async (req: Request, res: Response): Promise<Response> => {
        const menu = await Menu.findOne({ _id: req.params.id })

        return res.json(menu)
    },
    getAll: async (_: Request, res: Response): Promise<Response> => {
        const menu = await menuService.getAll();
        
        return res.json(menu)
    },
    delete: async (req: Request, res: Response): Promise<Response> => {
        const menu = await Menu.findOne({ _id: req.params.id })
        if (!menu || !menu?.id)
            return res.status(400).json({ message: 'Menu not found' })

        const relatedMenu = await Menu.findOne( { relatedId: req.params.id})
        if(relatedMenu)
            return res.status(200).json({ message: 'Menu has submenu. Delete submenus first'})

        const test = await Menu.deleteOne({ _id: menu.id })
        return res.json({
            id: menu.id,
        })
    },
}
