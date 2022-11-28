const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const numberOfItems = 500;

const getProduct = () => {
    const name = faker.commerce.productName();
    const slug = name + faker.phone.imei();
    return {
        slug,
        name,
        body: faker.commerce.productDescription(),
        images: [
            faker.image.imageUrl(),
            faker.image.abstract(),
            faker.image.food(),
        ],
        color: faker.color.human(),
        price: faker.commerce.price(1, 1000),
        stars: Math.floor(Math.random() * (5 - 1) + 1),
    }
}

const seed = () => {
    return [...Array(numberOfItems).keys()].map(getProduct);
}
const seeded = seed();

const saveInDB = async () => await prisma.product.createMany({ data: seeded });

const asyncHandler = async () => {
    try {
        await saveInDB();
    } catch (error) {
        throw new Error(error)
    }
}

asyncHandler().then(() => console.log("DONE!")).catch((error) => console.log("ERROR", error));