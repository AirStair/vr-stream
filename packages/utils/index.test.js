import { strictEqual } from 'node:assert';
import { resolve } from './index.js';
import { test } from 'node:test';

const meta = import.meta;

test('resolve', () => {
    const expected = '/home/ai/my-vision/packages/utils/test-file.js';
    const actual = resolve(meta, './test-file.js');
    strictEqual(actual, expected);
});

test('resolve throw \'not starts with ./\'', () => {
    const expected = 'not starts with ./';
    try {
        resolve(meta, 'test-file.js');
    } catch (error) {
        strictEqual(error, expected);
    }
});

