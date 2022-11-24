import { db } from '~/models/db.server';
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
    const products = await db.myProduct.findMany({ take: 10 });
    return products;
}

const Crud = props => {
    const products = useLoaderData();
    return (
        <div>
            <Link to="new">
                <button>Agregar</button>
            </Link>
            Crud
            <table border={1}>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Nombre del producto</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product, index) => {
                        return (<tr>
                            <td>{product?.id}</td>
                            <td>{product?.name}</td>
                            <td>{product?.body}</td>
                        </tr>)
                    })}

                </tbody>
                <Outlet />
            </table>

        </div>
    )
}

Crud.propTypes = {}

export default Crud