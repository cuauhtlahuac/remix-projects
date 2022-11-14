import React, { useState } from 'react'

import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import ComboBox from '~/components/ComboBox'

export const loader: LoaderFunction = () => {
    return ['Bliss', 'Adrian', 'Mars', 'Ana', 'Riveros', 'Rodrigo']
}

const ReactEnVivo = () => {
    const values = useLoaderData<string[]>();
    const [inputValue, setInputValue] = useState('')
    const list = values.filter((value) => value.toLowerCase().includes(inputValue.toLocaleLowerCase()))
    const handleOnChange = (value: string) => {
        setInputValue(value)
    }

    return (
        <ComboBox>
            <ComboBox.Input onChange={handleOnChange} />
            <ComboBox.Options>
                {list.map((value: string) => <ComboBox.Option>
                    {value}
                </ComboBox.Option>)}
            </ComboBox.Options>
        </ComboBox>
    )
}

export default ReactEnVivo
