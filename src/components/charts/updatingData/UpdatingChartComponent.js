import React from 'react';
import {render} from 'react-dom';
import Chart from './UpdatingChart';
import {parseKlineData, getSampleKlineData, parsePredictKlineData} from "../../chartUtils"

import {TypeChooser} from "react-stockcharts/lib/helper";
import io from "socket.io-client";
import {timeParse} from "d3-time-format";
import {func} from "prop-types";

class ChartComponent extends React.Component {
    constructor(props) {
        super(props);

        var sample = getSampleKlineData()
        this.state = {
            data: sample,
            predictData: sample
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

            if (data.date.getTime() == this.state.data[this.state.data.length - 1].date.getTime()){
                this.setState({
                    data: [...this.state.data.slice(0,-1), data]
                },function (){
                    console.log(this.state)
                });
            }else{
                this.setState({
                    data: [...this.state.data, data]
                },function (){
                    console.log(this.state)
                });
            }
        });

        socketClient.on("predictWsKline", req => {
            var tmp = JSON.parse(req.data)
            console.log()
            var data = parsePredictKlineData(JSON.parse(tmp[0]))

            if (data.date.getTime() == this.state.predictData[this.state.predictData.length - 1].date.getTime()){
                this.setState({
                    predictData: [...this.state.predictData.slice(0,-1), data]
                },function (){
                    console.log(this.state)
                });
            }else{
                this.setState({
                    predictData: [...this.state.predictData, data]
                },function (){
                    console.log(this.state)
                });
            }
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
                    <Chart type={"hybrid"} data={this.state.predictData}/>
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
