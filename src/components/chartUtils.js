import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

export function getSampleKlineData() {
    const sampleSize = 120;
    var sampleArr =  []

    for(var i =0; i<sampleSize; i++) {
        var tmp = {}
        tmp.date = new Date();
        tmp.open = 0;
        tmp.high = 0;
        tmp.low = 0;
        tmp.close = 0;
        tmp.volume = 0;
        sampleArr.push(tmp)
    }
    return sampleArr
}

export function parseKlineData(d) {
    var res= {}
    res.date = new Date(d.E);
    res.open = d.k.o;
    res.high = d.k.h;
    res.low = d.k.l;
    res.close = d.k.c;
    res.volume = d.k.v;
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
