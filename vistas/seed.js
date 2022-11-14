/* import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client' */

const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getProduct = () => {
    const name = faker.commerce.productName();
    return {
        slug: faker.helpers.slugify(name),
        name,
        body: faker.commerce.productDescription(),
        images: [
            faker.image.imageUrl(),
            faker.image.imageUrl(),
            faker.image.imageUrl(),
        ],
        color: faker.color.human(),
    }
}

const saveInDB = async () => await prisma.product.create({ data: getProduct() });

const seed = async () => {
    await Promise.all([...Array(10).keys()].map(saveInDB));
}

seed();