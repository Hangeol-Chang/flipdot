const circle = {
    effect: {
        keyframes : {
            '20%': 'fill: {dotOff}; transform: rotateZ(90deg) rotateY(0deg)',
            '50%': 'fill: {dotOff}; transform: rotateZ(135deg) rotateY(90deg)',
            '100%': 'fill: {dotOn}; transform: rotateZ(180deg) rotateY(180deg)',
        }
    },

    render({ cx, cy, cellX, cellY, dotRadius, dotSize, colors, className, style, dataAttrs }) {
        const r = dotRadius;
        const accentSize = 0.4;

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

        const accent2 = `
            <polygon
                points="
                    ${cx + r},${cy + r}
                    ${cx + r - accentSize*r},${cy + r}
                    ${cx + r},${cy + r - accentSize*r}
                "
                fill="${colors.dotOff}"
            />`;


        const outerPts = Array.from({ length: 32 }, (_, i) => {
            const a = (i / 32) * Math.PI * 2;
            return `${i === 0 ? 'M' : 'L'} ${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
        }).join(' ') + ' Z';

        const hr  = r * 0.25;
        const hx  = cx - r + 0.05*r;
        const hy  = cy;
        const holePath = `M ${hx + hr},${hy} A ${hr},${hr} 0 1,0 ${hx - hr},${hy} A ${hr},${hr} 0 1,0 ${hx + hr},${hy} Z`;

        const clipId = `cc-${cellX | 0}-${cellY | 0}`;
        const clip = `<clipPath id="${clipId}"><path d="${outerPts}"/></clipPath>`;

        const dot = `
            <path d="${outerPts} ${holePath}"
                fill-rule="evenodd"
                clip-path="url(#${clipId})"
                fill="${colors.dotOff}"
                class="${className}"
                style="${style}" ${dataAttrs}
            />`;

        return bg + accent + accent2 + clip + dot;
    },
};

export default circle;
