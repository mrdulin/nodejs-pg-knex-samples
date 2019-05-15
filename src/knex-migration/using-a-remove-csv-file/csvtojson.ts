import csv from 'csvtojson';
import request from 'request-promise';

async function csvToJSON(url: string) {
  return request.get(url).then(res => {
    return csv({
      output: 'json',
      noheader: false,
      delimiter: ',',
      headers: ['criteria_id', 'criteria_name', 'canonical_name', 'parent_id', 'country_code', 'target_type', 'status']
    }).fromString(res);
  });
}

export { csvToJSON };
