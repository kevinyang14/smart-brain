import React from 'react'

class Rank extends React.Component {
    render() {
        return (
            <div className = 'tc'>
                <div className='white f3'>
                    {'Kevin, your current rank is...'}
                </div>
                <div className='white f1'>
                    {'#1'}
                </div>
            </div>
        );
    }
}

export default Rank