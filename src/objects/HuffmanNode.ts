export class HuffmanNode
{
    public char: string;
    public freq: number;
    public left: HuffmanNode;
    public right: HuffmanNode;

    constructor (key: string, value: number)
    {
        this.char = key;
        this.freq = value;
    }
}