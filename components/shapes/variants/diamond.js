const diamond = {
    effect: {
        off: 'fill: {dotOff}; transform: rotateZ(0deg) rotateY(0deg);',
        mid: 'fill: {dotOff}; transform: rotateZ(45deg) rotateY(90deg);',
        on:  'fill: {dotOn}; transform: rotateZ(90deg) rotateY(180deg);',
    },

    render({ cx, cy, cellX, cellY, dotRadius, dotSize, isOn, dotOnColor, colors, className, style, dataAttrs }) {
        const bg     = `<rect x="${cellX}" y="${cellY}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
        const accent = `<polygon points="${cellX},${cellY} ${cellX + 4},${cellY} ${cellX},${cellY + 4}" fill="${colors.shadow}"/>`;
        const color  = isOn ? dotOnColor : colors.dotOff;
        const dot    = `<polygon points="${cx},${cy - dotRadius} ${cx + dotRadius},${cy} ${cx},${cy + dotRadius} ${cx - dotRadius},${cy}" fill="${color}" class="${className}" style="${style}"${dataAttrs}/>`;
        return bg + accent + dot;
    },
};

export default diamond;
