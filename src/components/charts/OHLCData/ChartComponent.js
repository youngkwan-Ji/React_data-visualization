import React from 'react';
import {render} from 'react-dom';
import Chart from './Chart';
import {getData} from "./chartUtils"

import {TypeChooser} from "react-stockcharts/lib/helper";
import io from "socket.io-client";
import {timeParse} from "d3-time-format";

class ChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    initSocket(){
        const socketClient = io("http://localhost:8290", {
            transports: ['websocket'],
        });
        socketClient.on("connect", () => {
            console.log("connection server");
        });

        socketClient.on("wsKline", req => {
            var jsonStr = String(req.data)
            // console.log(data);
            var data = parseData(jsonStr)
            // console.log(test)
            console.log(data)
            // this.setState({
            //     data: [...this.state.data, data]
            // });
        });


        function parseData(str) {
            var json = JSON.parse(str)
            // console.log(a)
            var res = {}
            // const parseDate = timeParse("%Y-%m-%d");
            res.date = timeParse(json.E)
            res.open = timeParse(json.k.t)
            res.high = json.k.h
            res.low = json.k.l
            res.close = json.k.c
            res.volume = json.k.v
            return res
        }
    }
    updateData = (data) => {

    }
    componentDidMount() {
        this.initSocket()
        // getData().then(data => {
        //     console.log(data)
        //
        //     this.setState({data})
        //     // console.log(this.state)
        // })
    }

    // componentWillMount() {
    //     socket.on("receive message", (message) => {   //"receive message"라는 이벤트 받음(2)
    //         this.setState({
    //             messageList: [...this.state.messageList, message],
    //         });
    //     });
    // }
    //
    // sendMsg = (e) => {
    //     e.preventDefault();
    //     socket.emit("send message", {		//"send message"라는 이벤트 발생 (1)
    //         name: this.state.name,
    //         msg: this.state.msg,
    //     });
    //     this.setState({
    //         name: "",
    //         msg: "",
    //     });
    // };
    //
    onChange = (e) => {
        console.log(this.state)
    };
    //

    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <TypeChooser>
                {type => <Chart type={type} data={this.state.data}/>}
            </TypeChooser>
        )
    }
}


export default ChartComponent;
// render(
//     <ChartComponent />,
//     document.getElementById("root")
// );
