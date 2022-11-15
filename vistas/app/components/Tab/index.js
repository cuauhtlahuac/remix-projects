import React, { useContext, useRef, useState } from 'react';
export const ThemeContext = React.createContext();

const hoverStyles = {
    container: {
        background: '#0002',
        borderInline: 'white 1px solid ',
    }
}

const Tab = ({ children, index, onPress }) => {
    const { data } = useContext(ThemeContext);
    const [overStyles, setOverStyles] = useState({})
    const [active, setActive] = useState(false)
    const divRef = useRef(index);

    const handleOnPress = () => {
        const currentActive = divRef.current.id == index;
        setActive(currentActive)
        onPress(data?.[index])
        if (currentActive) {
            setOverStyles({ hoverStyles })
        } else {
            setOverStyles({})
            setActive(false);
        }
    }

    const handleMouseLeave = () => {
        if (!active) {
            setOverStyles({});
            setActive(false);
        }
    }
    return (
        <div
            id={index}
            ref={divRef}
            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                cursor: 'pointer',
                borderInline: '#002244 1px solid ',
                borderRadius: 10,
                ...overStyles.container,
            }}
            onMouseOver={() => setOverStyles({ ...overStyles, ...hoverStyles })}
            onMouseLeave={handleMouseLeave}
            onClick={handleOnPress}
        >
            <h3 style={{ color: 'white' }}>{children}</h3>
        </div>
    )
}

const Group = ({ children, data }) => {
    return (
        <ThemeContext.Provider value={{ data }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                background: 'linear-gradient(70deg, #007FFF, #0066b2);',
                padding: 20,
            }}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

const List = ({ children }) => (
    <div style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        background: '#034694',
        borderRadius: 10,
    }}>
        {children}
    </div>)

const Panels = ({ children }) => (
    <div style={{ background: 'white', borderRadius: 10, padding: 10, marginTop: 10 }}>
        {children}
    </div>)

const Panel = ({ children }) => {
    const title = children.filter(item => item.type === 'h3')
    const details = children.filter(item => item.type === 'p')
    return (
        <div>
            {title}
            {details}
        </div>
    )
}

export default Tab;

Tab.Group = Group;
Tab.List = List;
Tab.Panels = Panels;
Tab.Panel = Panel;