import exec from 'k6/execution';
import http from 'k6/http';
import { SharedArray } from 'k6/data';
import { sleep } from 'k6';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const sharedData = new SharedArray("URLs", function () {
    let data = papaparse.parse(open('urls.csv'), { header: true }).data;
    return data;
});

export const options = {
    vus: 2,
    duration: '30s',
};

export default function () {
    const url = randomItem(sharedData).url;
    console.log(`VU: ${exec.vu.idInTest}, iteration: ${exec.scenario.iterationInTest}], url: ${url} Starting iteration...`);
    http.get(url);
    sleep(randomIntBetween(1, 3));
}