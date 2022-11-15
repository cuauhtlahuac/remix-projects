import { json } from '@remix-run/node';
import { Form, useActionData, useTransition } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import useRecorder from '~/hooks/useRecorder';
import fs from 'fs';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('audio');
    const ab = await file.arrayBuffer();
    const buf = Buffer.from(ab);
    fs.writeFileSync('public/audioFiles/audio.webm', buf);
    const form = Object.fromEntries(formData);


    const errors = {};

    if (form.title === '') {
        errors.title = 'Escribe un título';
    }
    if (form.description === '') {
        errors.description = 'Escribe una descripción';
    }

    if (!Object.keys(errors).length) {
        // TODO: guardar en la DB el path del file juntos title...
        return { errors: {}, success: true, form };
    } else {
        return json({ errors, form }, { status: 400 });
    }
};

export default function Podcast() {
    const data = useActionData();
    const transition = useTransition();
    const inputRef = useRef();
    const audioRef = useRef();
    const { blob, isRecording, audioURL, startRecording, stopRecording } =
        useRecorder();

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    useEffect(() => {
        if (blob && inputRef.current) {
            const file = new File([blob], 'audio.webm');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            inputRef.current.files = dataTransfer.files;
        }
    }, [blob]);

    console.log(transition);

    return (
        <div className='grid place-items-center'>
            <h2>Sube un episodio nuevo</h2>
            {data?.success && (
                <h3 className='text-green-500'>
                    Tu episodio se ha guardado! correctamente!!
                </h3>
            )}
            <audio src={audioURL} ref={audioRef} controls />
            <button
                onClick={toggleRecording}
                className={`rounded-full p-8  ${isRecording ? 'bg-red-500' : 'bg-blue-500'
                    }`}
            >
                {isRecording ? 'Grabando...' : 'Grabar'}
            </button>
            <Form method='post' encType='multipart/form-data'>
                <input name='audio' ref={inputRef} type='file' />
                <p>
                    <label>Titulo del episodio</label>
                    <input
                        defaultValue={data?.form.title}
                        className='border'
                        type='text'
                        name='title'
                        placeholder='escribe el titulo'
                    />
                    {data?.errors['title'] && (
                        <p className='text-red-500 text-sm'>{data?.errors['title']}</p>
                    )}
                </p>
                <p>
                    <label>Descripción</label>
                    <textarea
                        defaultValue={data?.form.description}
                        className='border'
                        name='description'
                    ></textarea>
                    {data?.errors['description'] && (
                        <p className='text-red-500 text-sm'>
                            {data?.errors['description']}
                        </p>
                    )}
                </p>
                <button className='border p-4'>
                    {transition.state !== 'idle' ? 'Loading...' : 'Enviar'}
                </button>
            </Form>
        </div>
    );
}