import fs, { WriteStream } from 'fs';
import https from 'https';
import { IncomingMessage } from 'http';

async function download(url: string, dest: string, callback: (err?: Error | undefined | null) => void) {
  const fileWriteStream: WriteStream = fs.createWriteStream(dest);
  const request = https.get(url, (res: IncomingMessage) => {
    if (res.statusCode !== 200) {
      return callback(new Error(`status code: ${res.statusCode}`));
    }
    res.pipe(fileWriteStream);
  });

  fileWriteStream.on('finish', () => {
    fileWriteStream.close();
    callback();
  });

  fileWriteStream.on('error', err => {
    fs.unlink(dest, exception => {
      callback(exception || err);
    });
  });

  request.on('error', (err: Error) => {
    fs.unlink(dest, exception => {
      callback(exception || err);
    });
  });
}

function downloadPromise(url: string, dest: string) {
  return new Promise((resolve, reject) => {
    download(url, dest, err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

export { download, downloadPromise };
