import React from 'react';
import {render} from 'react-dom';
import Chart from './UpdatingChart';
import {parseKlineData,getSampleKlineData} from "../../chartUtils"

import {TypeChooser} from "react-stockcharts/lib/helper";
import io from "socket.io-client";
import {timeParse} from "d3-time-format";
import {func} from "prop-types";

class ChartComponent extends React.Component {
    constructor(props) {
        super(props);

        var sample = getSampleKlineData()
        this.state = {
            data: sample
        }
        // console.log(a)
        this.initSocket()
    }


    initSocket() {
        const socketClient = io("http://localhost:8290", {
            transports: ['websocket'],
        });
        socketClient.on("connect", () => {
            console.log("connection server");
        });

        socketClient.on("wsKline", req => {
            var jsonStr = String(req.data)
            var data = parseKlineData(JSON.parse(jsonStr))
            // console.log(data)
            this.setState({
                data: [...this.state.data, data]
            },function (){
                console.log(this.state)
            });
        });
    }


    componentDidMount() {

    }

    render() {
        // return <div>Loading...</div>
        // if (this.state.data.length < 2) {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            // <TypeChooser>
                <div>
                <Chart type={"hybrid"} data={this.state.data}/>
                    {/*{type => <Chart type={type} data={this.state.data}/>}*/}
                </div>
            //</TypeChooser>
        )
    }
}


export default ChartComponent;
// render(
//     <ChartComponent />,
//     document.getElementById("root")
// );
