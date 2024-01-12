import { rendering } from '@vr-stream/rendering';
import { streaming } from '@vr-stream/streaming';
import { createSecureServer } from 'node:http2';
import { resolve } from '@vr-stream/utils';
import { readFileSync } from 'node:fs';

import { port } from './const.js';

const meta = import.meta;

const key = readFileSync('localhost-privkey.pem');
const cert = readFileSync('localhost-cert.pem');

const server = createSecureServer({
    key,
    cert
});

server.listen(port);

const { error } = console;

server.on('error', error);

server.on('stream', async (stream, headers) => {
    const readStream = streaming(stream, headers);
    const template = rendering(stream);
    const path = headers[':path'];
    switch (path) {
        case '/':
            await template(resolve(meta, './public/index.html'));
            break;
        case '/three.min.js':
            await template(resolve(meta, './public/three.min.js'));
            break;
        case '/panolens.min.js':
            await template(resolve(meta, './public/panolens.min.js'));
            break;
        case '/main.js':
            await template(resolve(meta, './public/main.js'));
            break;
            
        case '/5.mp4':
            readStream('./public/5.mp4');
            break;
    }
});
