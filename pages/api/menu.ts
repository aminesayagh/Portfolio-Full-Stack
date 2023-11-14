import { NextApiRequest, NextApiResponse } from "next";
import { getMenuItems, menuValues, MenuType, MenuItem } from "@/conf/router";

type Data = {
    message: string;
} | {
    items: MenuItem[]
}
interface MenuQuery extends NextApiRequest {
    query: {
        name: MenuType;
    }
}

export default async function handler(
    req: MenuQuery,
    res: NextApiResponse<Data>
) {
    const { name } = req.query;
    if(!menuValues.includes(name as MenuType)) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    const menuItems = getMenuItems(name);
    res.status(200).json({ items: menuItems });
}