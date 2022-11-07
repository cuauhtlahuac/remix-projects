import { useLoaderData, useSubmit } from "@remix-run/react";
import { db } from "~/models/db.server";
import { Pagination, Card, Typography } from 'antd';

const { Meta } = Card;
const { Title } = Typography;

const pageSize = 10;

export async function loader({ request }) {
    const url = new URL(request.url);
    const page = url.searchParams.get("page");
    const skip = (Number(page) * Number(pageSize)) - pageSize;
    const total = await db.myProduct.count();
    const product = await db.myProduct.findMany({
        skip,
        take: pageSize,
    });
    return { product, total, page }
}

export default function ProductList() {
    const submit = useSubmit();
    const { product, total, page } = useLoaderData();
    const onPageChange = (page: number) => {
        submit({ page: `${page}` });
    }
    return (
        <div style={{ padding: '20px' }}>
            <Title>Products list</Title>
            <div style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', gap: '2px', marginTop: '10px', marginBottom: '10px' }}>
                {product.map(({
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
            </div>
            <Pagination
                defaultCurrent={1}
                current={page}
                pageSize={pageSize}
                defaultPageSize={pageSize}
                total={total}
                showTotal={() => `Total ${total} items`}
                onChange={onPageChange}
                showQuickJumper={false}
                pageSizeOptions={['10']}
            />
        </div>
    );
}
