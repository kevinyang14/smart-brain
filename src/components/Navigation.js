import React from 'react'

class Navigation extends React.Component {
    render() {
        return (
            <nav style={ style }>
                <p className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        );
    }
}

const style = {
    display: 'flex',
    justifyContent: 'flex-end'
}

export default Navigation