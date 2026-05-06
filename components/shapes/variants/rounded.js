const rounded = {
    effect: {
        off: 'fill: {dotOff}; opacity: 1;',
        mid: 'fill: {dotOn}; opacity: 0.3;',
        on:  'fill: {dotOn}; opacity: 1;',
    },

    render({ cx, cy, cellX, cellY, dotRadius, dotSize, isOn, dotOnColor, colors, className, style, dataAttrs }) {
        const bg     = `<rect x="${cellX}" y="${cellY}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
        const accent = `<polygon points="${cellX},${cellY} ${cellX + 4},${cellY} ${cellX},${cellY + 4}" fill="${colors.shadow}"/>`;
        const color  = isOn ? dotOnColor : colors.dotOff;
        const size   = dotRadius * 2;
        const rx     = Math.max(1, Math.round(dotRadius * 0.4));
        const dot    = `<rect x="${cx - dotRadius}" y="${cy - dotRadius}" width="${size}" height="${size}" rx="${rx}" ry="${rx}" fill="${color}" class="${className}" style="${style}"${dataAttrs}/>`;
        return bg + accent + dot;
    },
};

export default rounded;
