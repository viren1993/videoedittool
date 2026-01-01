export declare function convertSvgColorsToHex(svgString: string): string;
export declare function transfString(input: string, replaceString: {
    [key: string]: string;
}): string;
export declare function prefixSvgClasses(svgCode: string, prefix: string, width?: number, height?: number): {
    serializer: string;
    colors: string[];
};
