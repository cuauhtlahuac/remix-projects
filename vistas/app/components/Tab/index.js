import React, { useContext, useRef, useState } from 'react';
export const ThemeContext = React.createContext();

const activeStyles = 'bg-blend-lighten bg-white'

const Tab = ({ children, index }) => {
    const { current, setCurrent } = useContext(ThemeContext);
    const divRef = useRef(index);

    const active = current === index;
    return (
        <div
            ref={divRef}
            className={
                `flex flex-1 justify-center rounded-t-lg h-10 items-center
            ${active && activeStyles}
            ${!active && 'hover:bg-[#5dacbd]/50 cursor-pointer'}`
            }
            onClick={() => setCurrent(index)}
        >
            <h3 className={`font-mono text-white ${active && 'text-black'}`}>
                {children}
            </h3>
        </div>
    )
}

const Group = ({ children, defaultIndex }) => {
    const [current, setCurrent] = useState(defaultIndex)
    return (
        <ThemeContext.Provider value={{ current, setCurrent }}>
            <div
                className={'flex p-6 shadow-lg flex-col flex-1' +
                    'bg-gradient-to-r bg-gradient-to-r from-[#24527a] via-[#5dacee] to-[#5dacbd]'}
            >
                {children}
            </div>
        </ThemeContext.Provider >
    )
}

const List = ({ children }) => (
    <div
        className={
            `flex flex-1 flex-row
            justify-between items-center
            rounded-t-lg bg-[#24527a]`
        }
    >
        {children}
    </div>)

const Panels = ({ children }) => {
    const { current } = useContext(ThemeContext)
    return (
        <div
            className='bg-white rounded-b-lg p-2'
        >
            {children(current)}
        </div>)
}

const Panel = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default Tab;

Tab.Group = Group;
Tab.List = List;
Tab.Panels = Panels;
Tab.Panel = Panel;