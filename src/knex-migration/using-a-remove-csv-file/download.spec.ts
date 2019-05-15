import { download } from './download';
import path from 'path';

describe('download', () => {
  it('t1', done => {
    const url = 'https://developers.google.com/adwords/api/docs/appendix/geo/geotargets-2019-05-02.csv';
    const dest = path.resolve(__dirname, './geotargets-2019-05-02.csv');
    download(url, dest, err => {
      if (err) {
        done.fail(err);
      }
      done();
    });
  });
});
