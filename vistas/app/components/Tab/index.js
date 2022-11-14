import React, { useContext, useState } from 'react';
export const ThemeContext = React.createContext([]);

const Tab = ({ children, index, onPress }) => {
    const data = useContext(ThemeContext);
    const [overStyles, setOverStyles] = useState({})
    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                cursor: 'pointer',
                ...overStyles
            }}
            onMouseOver={() => setOverStyles({ background: '#0002' })}
            onMouseLeave={() => setOverStyles({})}
            onClick={() => onPress(data[index])}
        >
            <h3 style={{ color: 'blue' }}>{children}</h3>
        </div>
    )
}

const Group = ({ children, data }) => {
    return (
        <ThemeContext.Provider value={data}>
            <div style={{
                border: '1px solid red',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
            }}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

const List = ({ children }) => (
    <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    }}>
        {children}
    </div>)

const Panels = ({ children }) => (
    <div style={{ background: 'red' }}>
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

export default Tab

Tab.Group = Group;
Tab.List = List;
Tab.Panels = Panels;
Tab.Panel = Panel;