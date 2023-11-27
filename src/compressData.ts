import { config } from './config/config';
import { HuffmanUtilities } from './objects/HuffmanUtilities';
import { readFile } from './common/readFile';

function compressData(): void
{
    const fileData: string = readFile(config.encoding.ascii);
    HuffmanUtilities.compress(fileData);
}

compressData();
