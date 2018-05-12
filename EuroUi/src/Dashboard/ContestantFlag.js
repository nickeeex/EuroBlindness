
import React, { Component } from 'react';


class ContestantFlag extends Component {
    render() {
        return (
            <g transform={`translate(${this.props.x-25},${this.props.y-12})`}>
                <image xlinkHref={"../images/flags/round/svg/"+this.props.payload.value.toLowerCase().replace(" ", "-")+".svg"} x={0} y={0} height="20px" width="20px" textAnchor="middle" fill="#666" />
            </g>
        )
    }
}

export default ContestantFlag;