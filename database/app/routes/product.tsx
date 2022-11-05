import { useLoaderData } from '@remix-run/react';
import React from 'react'
import { db } from '~/models/db.server';

export const loader = async () => {
    // Populate data
    // const product = await db.product.create({
    //     data: {
    //         slug: "Rage Against The Machine",
    //         title: "Rage",
    //         body: "Lorem",
    //         images: [
    //             "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    //             "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png"
    //         ]
    //     }
    // })
    const products = await db.product.findMany()
    console.log(product);
    return products;
};

const product = () => {
    const data = useLoaderData();
    return (
        <div>{JSON.stringify(data)}</div>
    )
}

export default product;
