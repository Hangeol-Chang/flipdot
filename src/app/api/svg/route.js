import { NextResponse } from 'next/server';
import { DEFAULTS } from '../../../../components/config/defaults.js';
import { textToPattern, customDotsToPattern, cropOrPadPattern } from '../../../../components/pattern/converter.js';
import { generateFlipDotSVG } from '../../../../components/svg/generator.js';
import styleRegistry from '../../../../components/styles/index.js';
import { addHashToColor } from '../../../../components/utils/colors.js';

export async function GET(request) {
    const { searchParams } = new URL(request.url);

    const text         = searchParams.get('text')          || DEFAULTS.text;
    const style        = searchParams.get('style')         || DEFAULTS.style;
    const dotSize      = parseInt(searchParams.get('dotSize'))    || DEFAULTS.dotSize;
    const spacing      = parseInt(searchParams.get('spacing'))    || DEFAULTS.spacing;
    const animationMode = searchParams.get('animationMode') || DEFAULTS.animationMode;
    const speed        = parseFloat(searchParams.get('speed'))    || DEFAULTS.speed;
    const direction    = searchParams.get('direction')     || DEFAULTS.direction;
    const align        = searchParams.get('align')         || DEFAULTS.align;
    const justify      = searchParams.get('justify')       || DEFAULTS.justify;
    const dotShape     = searchParams.get('dotShape')      || DEFAULTS.dotShape;
    const customDots   = searchParams.get('customdots');
    const fixedRows    = searchParams.get('row')    ? parseInt(searchParams.get('row'))    : null;
    const fixedCols    = searchParams.get('column') ? parseInt(searchParams.get('column')) : null;

    const customColors = {
        dotOn:      searchParams.get('dotOn')      ? addHashToColor(searchParams.get('dotOn'))      : null,
        dotOff:     searchParams.get('dotOff')     ? addHashToColor(searchParams.get('dotOff'))     : null,
        background: searchParams.get('background') ? addHashToColor(searchParams.get('background')) : null,
    };

    const rawPattern = customDots
        ? customDotsToPattern(customDots)
        : textToPattern(text, justify);

    const needsCrop = (fixedRows || fixedCols)
        && !(animationMode === 'waterfall')
        && !(animationMode === 'scroll' && fixedCols && !fixedRows);

    const pattern = needsCrop
        ? cropOrPadPattern(rawPattern, fixedRows, fixedCols, align, justify)
        : rawPattern;

    const colors = styleRegistry.getColors(style, customColors);

    const svg = generateFlipDotSVG(pattern, {
        dotSize,
        spacing,
        colors,
        animationMode,
        speed,
        fixedCols,
        fixedRows,
        direction,
        align,
        justify,
        dotShape,
    });

    return new NextResponse(svg, {
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
