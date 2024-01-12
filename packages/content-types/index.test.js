import { getContentType } from './index.js';
import { strictEqual } from 'node:assert';
import { test } from 'node:test';

const elements = [
    {
        file: 'test.js',
        contentType: 'text/javascript',
    },
    {
        file: 'test.html',
        contentType: 'text/html',
    },
    {
        file: 'test.mp4',
        contentType: 'video/mp4',
    },
];

elements.forEach(element => {
    const elementFile = element.file;
    const elementContentType = element.contentType;
    test(`${elementFile} = ${elementContentType}`, () => {
        const contentType = getContentType(elementFile);
        strictEqual(contentType, elementContentType);
    });
}