import { useState } from "react";

const defaultListItems = [
	{ selected: true, name: 'all', categoryId: 0 },
	{ selected: false, name: 'closes', categoryId: 1 },
	{ selected: false, name: 'electronics', categoryId: 2 },
	{ selected: false, name: 'furnitures', categoryId: 3 },
	{ selected: false, name: 'shoes', categoryId: 4 },
	{ selected: false, name: 'others', categoryId: 5 }
];

const useNavList = () => {
    const [ navListItems, setNavListItems ] = useState(defaultListItems);

    /**
     * @param  {string} itemToSelect
     * @returns {number} idCategory
     * It receives the name of the category that will be selected, it select it, 
     * and returns the id of that category. 
     */
    const updateList = ( itemToSelect ) => {
        let idCategory;
        const newNavListState = navListItems.map((item) => {
            if(item.name === itemToSelect) idCategory = item.categoryId;
            return {
                selected: (item.selected === true || item.name !== itemToSelect ? false : true),
                name: item.name,
                categoryId: item.categoryId
            };
        });

        setNavListItems(newNavListState);
        return idCategory;
    }

    return { navListItems, updateList };
}

export { useNavList };