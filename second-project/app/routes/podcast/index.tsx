import { json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

export const action = async ({ request }: any) => {
    const formData = await request.formData()
    const form = Object.fromEntries(formData);
    if (form.title === '') {
        return json({ error: 'Rellena el campo title' }, { status: 400 }) // 400 bad request
    }
    return null;
}

const Podcast = () => {
    // input action, a quien le doy el formulario ejemplo /react
    const data = useActionData();
    return (
        <div>
            <h2 className="bg-red underline">Sube un episodio</h2>
            <Form method="post">
                {data && (<p className='text-black'>{data?.error}</p>)}
                <p>
                    <label>Titulo del episodio</label>
                    <input
                        defaultValue={data?.form?.title}
                        type="text"
                        name="title"
                        placeholder='escribe el titulo'
                    />
                </p>
                <p>
                    <label>description</label>
                    <textarea
                        defaultValue={data?.form?.description}
                        name="description"></textarea>
                </p>
                <button>enviar</button>
            </Form>
        </div>
    )
}

export default Podcast