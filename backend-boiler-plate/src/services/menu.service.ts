import Menu from '../models/menu'

interface menu {
    id?: String | undefined
    name: String
    relatedId?: String | undefined
    submenus?: Array<menu> | undefined
}

export default {
    getAll: async (): Promise<menu[]> => {
        const menu = await Menu.find()
        menu.reverse()
        for( let menuItem of menu ) {   
            if(menuItem.relatedId) {
                const index = menu.findIndex(edit => edit.id == menuItem.relatedId)
                if(menu[index].submenus)                    
                    menu[index].submenus?.push({
                                id: menuItem._id,
                                name: menuItem.name,
                                submenus: menuItem.submenus
                            })
                else menu[index].submenus= [{
                    id: menuItem._id,
                    name: menuItem.name,
                    submenus: menuItem.submenus
                }]
            }  
        }

        const filterMenu = menu.filter(menu => !menu.relatedId)

        const response: Array<menu> = filterMenu.map( menu => {
            return {
                id: menu._id,
                name: menu.name,
                submenus: menu.submenus
            }            
        });

        return response
    }
}