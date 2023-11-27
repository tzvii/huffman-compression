export const config =
{
    encoding: {
        ascii: <BufferEncoding>'ascii',
        utf8: <BufferEncoding>'utf8',
        binary: <BufferEncoding>'binary',
    },
    splitKey: process.env.SPLIT_KEY || 'a53ab8a6-e0b0-4481-91ca-725dc7c86f9d'
};