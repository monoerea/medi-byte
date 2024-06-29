import {getAgeDistributionbyGender, getSelfInsured, getCompanyFreq, getAgeDistributionCount, getGenderDistribution} from './sql';
import {prepareGroupedBarChartData, transform} from '../../lib/utils.js';

export const handler = async(data) =>{
    console.log('HANDLER', data);
    switch(data.type){
        case 'distribution':
            return await computeDistribution(data);
        case 'average':
            return await computeAverage(data);
        case 'frequency':
            return await computeFreq(data);
    }
}

const computeAverage = async(data) =>{
    console.log('computeAverage', data);
    switch(data.req){
        case 'age':
            const result = transform(await getAgeDistributionbyGender(), data.chartType);
            console.log(result);
            return result;
    }
}

const computeDistribution = async(data) =>{
    console.log('computeDistribution', data);
    switch(data.req){
        case 'insured':
            const result = transform(await getSelfInsured(), data.chartType);
            console.log(result);
            return result;
        case 'age':
            const res = transform(await getAgeDistributionCount(), data.chartType);
            console.log(res);
            return res;
        case 'gender':
            const results = transform(await getGenderDistribution(), data.chartType);
            console.log(results);
            return results;
    }
}

const computeFreq = async(data) =>{
    console.log('computeFreq', data);
    switch(data.req){
        case 'company':
            console.log('INN', data);
            const result = prepareGroupedBarChartData(await getCompanyFreq());
            console.log(result);
            return result;
    }
}

