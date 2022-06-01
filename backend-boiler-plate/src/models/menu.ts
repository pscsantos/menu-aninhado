import { model, Schema } from 'mongoose'

interface menu {
    id?: String
    name: String
    relatedId?: String | undefined
    submenus?: Array<menu>
}

interface IMenu {
    _id?: string
    name: string
    relatedId?: string,
    submenus?: Array<menu>
}

const schema = new Schema<IMenu>({
    name: { type: String, required: true },
    relatedId: { type: String },
    //submenus: { type: Array },
})

export default model<IMenu>('menu', schema, 'menus')
