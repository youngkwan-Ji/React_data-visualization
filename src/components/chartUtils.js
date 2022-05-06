import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

export function getSampleKlineData() {
    const sampleSize = 120;
    var sampleArr =  []

    for(var i =0; i<sampleSize; i++) {
        var tmp = {}
        tmp.date = new Date();
        tmp.open = 36400;
        tmp.high = 36400;
        tmp.low = 36400;
        tmp.close = 36400;
        tmp.volume = 0;
        sampleArr.push(tmp)
    }
    return sampleArr
}

export function parseKlineData(d) {
    var res= {}
    res.date = new Date(d.k.t);
    res.open = d.k.o;
    res.high = d.k.h;
    res.low = d.k.l;
    res.close = d.k.c;
    res.volume = d.k.v;
    res.last = d.k.x;
    return res
}


export function parsePredictKlineData(d) {
    var res= {}
    res.date = new Date(d.date);
    res.open = d.open;
    res.high = d.high;
    res.low = d.low;
    res.close = d.open;
    res.volume = 0;
    res.last = true;
    return res
}

function parseData(parse) {
    return function(d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;

        return d;
    };
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
    const promiseMSFT = fetch("https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/MSFT.tsv")
        .then(response => response.text())
        .then(data => tsvParse(data, parseData(parseDate)))
    return promiseMSFT;
}
