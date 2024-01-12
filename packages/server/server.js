import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cluster from 'cluster';
import os from 'os';

const meta = import.meta;
const { url } = meta;
const path = fileURLToPath(url);
const localDirname = dirname(path);

const { cpus } = os;
const { length } = cpus();

const exec = `${localDirname}/index.js`;

cluster.setupPrimary({ exec });

for (
  let index = 0;
  index < length;
  index++
) {
  cluster.fork();
}

cluster.on('exit', cluster.fork);
