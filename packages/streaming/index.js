import { getContentType } from '@my-vision/content-types';
import { promises, createReadStream } from 'node:fs';

export const streaming = (stream, { range }) => async file => {
    const notDigit = range.replace(/\D/g, '');
    const start = +notDigit;
    const part = 100 ** 6;
    const arg1 = start + part;
    const { stat } = promises;
    const { size } = await stat(file);
    const arg2 = size - 1;
    const { min } = Math;
    const end = min(arg1, arg2);
    const contentLength = end - start + 1;
    const status = 206;
    const contentType = getContentType(file);
    stream.respond({
        ':status': status,
        'accept-ranges': 'bytes',
        'content-type': contentType,
        'content-length': contentLength,
        'content-range': `bytes ${start}-${end}/${size}`,
    });
    const options = {
        start,
        end
    };
    const readStream = createReadStream(file, options);
    readStream.pipe(stream);
};
