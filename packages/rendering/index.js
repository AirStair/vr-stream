import { getContentType } from '@my-vision/content-types';
import { promises } from 'node:fs';

export const rendering = (stream) => async (file) => {
    const contentType = getContentType(file);
    const { readFile } = promises;
    const template = await readFile(file);
    const templateString = template.toString();
    stream.respond({
        'content-type': contentType
    });
    stream.end(templateString);
};