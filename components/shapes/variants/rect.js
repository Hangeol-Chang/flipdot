const rect = {
    css: `
        .anim-dot.bg-triangle[data-x][data-y] {
            animation: none;
            transform: rotate(-45deg) scaleY(1) rotate(45deg);
            fill: var(--dotOn);
        }
    `,

    effect: {
        keyframes: {
            '0%':   'fill: {dotOff}; transform: rotate(-45deg) scaleY(-1) rotate(45deg);',
            '30%':   'fill: {dotOff}; transform: rotate(-45deg) scaleY(-1) rotate(45deg);',
            
            '100%':  'fill: {dotOn};  transform: rotate(-45deg) scaleY(1) rotate(45deg);',
        },
    },

    render({ cx, cy, cellX, cellY, dotRadius, dotSize, colors, className, style, dataAttrs }) {
        const r = dotRadius;
        const holeSize = 0.25;

        const bg = `
            <rect
                x="${cellX}" y="${cellY}"
                width="${dotSize}"
                height="${dotSize}"
                fill="${colors.background}"
            />
        `;

        // 우하단 삼각형: 정적, 목적지 색상 표시 (애니메이션 중 배경 역할)
        const lowerRight = `
            <polygon
                points="
                    ${cx + r},${cy - r + 0.1*r} 
                    ${cx + r},${cy + r} 
                    ${cx - r + 0.1*r},${cy + r}
                "
                class="${className} bg-triangle" style="${style}" ${dataAttrs}
            />`;

        // 좌상단 삼각형: 대각선 축으로 flip 애니메이션
        const upperLeft = `
            <polygon
                points="
                    ${cx - r + holeSize*r/1.414}, ${cy - r + holeSize*r/1.414}
                    ${cx - r + holeSize*r/1.08}, ${cy - r + holeSize*r/2.61}
                    ${cx - r + holeSize*r}, ${cy - r}
                    ${cx + r - 0.1*r},${cy - r}
                    ${cx - r}, ${cy + r - 0.1*r} 
                    ${cx - r},${cy -r + holeSize*r}
                    ${cx - r + holeSize*r/2.61}, ${cy - r + holeSize*r/1.08}
                "
                class="${className}" style="${style}" ${dataAttrs}
            />`;

        return bg + lowerRight + upperLeft;
    },
};

export default rect;
