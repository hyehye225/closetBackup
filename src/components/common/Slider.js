import React, { Component } from 'react'
import Slider from 'react-rangeslider'
class Horizontal extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            value: 1850
        }
    }
    handleChangeStart = () => {
        console.log('Change event started')
    };
    handleChange = value => {
        this.setState({
            value: value
        })
    };

    handleChangeComplete = () => {
        console.log('Change event completed')
    };
    render () {
        const { value } = this.state
        return (
            <div>
                {/* <div className='slider'  style={{ width:'100px',backgroundColor:'EF5350'}} > */}

                    <div style={{ textAlign:'center',color:'gray',fontSize:'35px',marginBottom:'82px'}}>
                        {/* <p> What is the size of your property?</p> */}
                    </div>
                    <Slider
                        min={1}
                        max={5}
                        value={3}
                        onChangeStart={this.handleChangeStart}
                        onChange={this.handleChange}
                        onChangeComplete={this.handleChangeComplete}
                    />
                    <div className='value'>{value}</div>

                </div>
            // </div>
        )
    }
}
export default Horizontal