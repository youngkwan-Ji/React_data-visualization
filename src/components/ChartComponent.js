
import React from 'react';
import { render } from 'react-dom';
import Chart from '../modules/react-stockcharts-master/src/lib/Chart';
import { getData } from "./chartUtils"

import { TypeChooser } from "../modules/react-stockcharts-master/src/lib/helper";
//
// const AdminNavbar = () => {
//     return (
//     )
// }


class ChartComponent extends React.Component {
    componentDidMount() {
        getData().then(data => {
            this.setState({ data })
        })
    }
    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <TypeChooser>
                {type => <Chart type={type} data={this.state.data} />}
            </TypeChooser>
        )
    }
}


export default ChartComponent;
// render(
//     <ChartComponent />,
//     document.getElementById("root")
// );
