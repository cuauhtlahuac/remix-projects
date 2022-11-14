import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { db } from "~/models/db.server";
import { Pagination, Card, Typography } from 'antd';
import { MyProduct } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";

const { Meta } = Card;
const { Title } = Typography;

interface LoaderDataType {
    products: MyProduct[];
    total: number;
    pageSize: number;
    page: number;
}

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) ?? 1;
    const take = Number(url.searchParams.get("pageSize")) ?? 10;
    const skip = page * take - take

    const total = await db.myProduct.count();
    const products = await db.myProduct.findMany({
        skip,
        take,
    });

    return { products, total, pageSize: take, page }
}

export default function ProductList() {
    const { products, total, pageSize, page } = useLoaderData<LoaderDataType>();
    const navigate = useNavigate()

    const onPageChange = (page: number, pageSize: number) => {
        navigate(`/product-list?page=${page}&pageSize=${pageSize}`)
    }

    return (
        <div style={{ padding: '20px' }}>
            <Title>Products list</Title>
            <ListOfProducts products={products} />
            <Pagination
                defaultCurrent={page}
                defaultPageSize={pageSize}
                total={total}
                showTotal={() => `Total: ${total}`}
                onChange={onPageChange}
                pageSizeOptions={['10', '30', '50', '100', '200']}
            />
        </div>
    );
}

const ListOfProducts = ({ products }: { products: MyProduct[] }) => (<div style={{
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '2px',
    marginTop: '10px',
    marginBottom: '10px'
}}>
    {products.map(({
        id,
        body,
        images,
        name,
    }) => (
        <Card
            key={id}
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={images[0]} />}
        >
            <Meta title={name} description={body} />
        </Card>))}
</div>)
