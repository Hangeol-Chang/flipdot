const circle = {
    effect: {
        keyframes : {
            '20%': 'fill: {dotOff}; transform: rotateZ(45deg) rotateY(0deg);',
            '50%': 'fill: {dotOff}; transform: rotateZ(45deg) rotateY(90deg);',

            '100%': 'fill: {dotOn}; transform: rotateZ(45deg) rotateY(180deg);',
        }
    },

    render({ cx, cy, cellX, cellY, dotRadius, dotSize, isOn, dotOnColor, colors, className, style, dataAttrs }) {
        const r = dotRadius;
        const accentSize = 0.3;

        const bg     = `
            <rect x="${cellX}" y="${cellY}" 
                width="${dotSize}" height="${dotSize}" fill="${colors.background}"
            />`;

        const accent = `
            <polygon

                points="
                    ${cx - r},${cy - r} 
                    ${cx - r + accentSize*r},${cy - r}
                    ${cx - r},${cy - r + accentSize*r} 
                "
                fill="${colors.dotOff}"
            />`;

        const dot    = `
            <circle cx="${cx}" cy="${cy}" r="${r}" 
                fill="${isOn ? dotOnColor : colors.dotOff}"
                class="${className}" 
                style="${style}" ${dataAttrs}
            />`;

        return bg + accent + dot;
    },
};

export default circle;
