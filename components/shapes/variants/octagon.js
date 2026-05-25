const octagon = {
    effect: {
        keyframes : {
            '20%': 'fill: {dotOff}; transform: rotateZ(112.5deg) rotateY(0deg)',
            '50%': 'fill: {dotOff}; transform: rotateZ(157.5deg) rotateY(90deg)',
            '100%': 'fill: {dotOn}; transform: rotateZ(202.5deg) rotateY(180deg)',
        }
    },

    render({ cx, cy, cellX, cellY, dotRadius, dotSize, colors, className, style, dataAttrs }) {
        const r   = dotRadius;
        const accentSize = 0.4;

        const bg  = `<rect x="${cellX}" y="${cellY}" width="${dotSize}" height="${dotSize}" fill="${colors.background}"/>`;
        
        const accent = `
            <polygon
                points="
                    ${cx - r},${cy - r}
                    ${cx - r + accentSize*r},${cy - r}
                    ${cx - r},${cy - r + accentSize*r}
                "
                fill="${colors.dotOff}"
            />`;

        const accent2 = `
            <polygon
                points="
                    ${cx + r},${cy + r}
                    ${cx + r - accentSize*r},${cy + r}
                    ${cx + r},${cy + r - accentSize*r}
                "
                fill="${colors.dotOff}"
            />`;


        const pts = Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return `${cx + 1.1 * r * Math.cos(a)},${cy + 1.1 * r * Math.sin(a)}`;
        }).join(' ');

        const dot = `
            <polygon 
                points="${pts}" 
                
                fill="${colors.dotOff}" 
                class="${className}" 
                style="${style}"
                ${dataAttrs}
            />`;
        return bg + accent + accent2 + dot;
    },
};

export default octagon;
