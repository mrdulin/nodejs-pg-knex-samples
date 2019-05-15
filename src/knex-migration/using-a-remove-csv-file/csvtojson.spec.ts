import { csvToJSON } from './csvtojson';
import { pd } from 'pretty-data';

describe('csvtojson', () => {
  it('t1', async () => {
    const filename = 'geotargets-2019-05-02.csv';
    const url = `https://developers.google.com/adwords/api/docs/appendix/geo/${filename}`;
    const response = await csvToJSON(url);
    console.log(`csvresponse: ${pd.json(response)}`);
  }, 20000);
});
