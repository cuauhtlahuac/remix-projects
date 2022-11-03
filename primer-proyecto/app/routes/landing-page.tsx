import { useLoaderData } from '@remix-run/react';
import styles from '~/styles/app.css';

export const links = () => {
    return [
        {
            rel: 'stylesheet',
            href: styles,
        },
    ];
};

export const meta = async () => {
    return {
        title: 'Landing page',
        description: 'This is a landing page',
    };
};

export const action = async ({ request, params }) => {
    return null;
};

export const loader = async ({ request, params }) => {
    const characters = await (await fetch("https://rickandmortyapi.com/api/character")).json();
    return characters;
};

export default function LandingPage() {
    const { results } = useLoaderData();
    const [, , , {
        name,
        species,
        gender,
        origin,
        location,
        image
    }] = results
    return (
        <section className='hero text'>
            <div className="text">
                <h1>Soy {name}</h1>
                <p>{origin?.name}</p>
                <p>{location?.name}</p>
                <p>{species}</p>
                <p>{gender}</p>
            </div>
            <figure className='illustration'>
                <img src={image} />
            </figure>
            <button className='cta'>{`VAMOS A ${origin?.name}!`}</button>
        </section >
    );
}