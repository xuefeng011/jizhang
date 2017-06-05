import React, {
    Component
} from 'react'



class Foot extends Component {

    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <h1>testfoot</h1>
        );
    }
}

Foot.propTypes = {

}

Foot.defaultProps = {

}

export default Foot