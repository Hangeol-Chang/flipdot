/**
 * Shape Registry
 * dot의 SVG 형태를 플러그인으로 관리
 *
 * 커스텀 shape 추가 예시:
 *   import shapeRegistry from './components/shapes/index.js';
 *   shapeRegistry.register('star', {
 *     render: ({ cx, cy, dotRadius, dotColor, className, style, dataAttrs }) => `...`,
 *   });
 */

const shapes = {
    circle: {
        render: ({ cx, cy, dotRadius, dotColor, className, style, dataAttrs }) =>
            `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="${dotColor}" class="${className}" style="${style}"${dataAttrs}/>`,
    },

    rect: {
        render: ({ cx, cy, dotRadius, dotColor, className, style, dataAttrs }) => {
            const size = dotRadius * 2;
            return `<rect x="${cx - dotRadius}" y="${cy - dotRadius}" width="${size}" height="${size}" fill="${dotColor}" class="${className}" style="${style}"${dataAttrs}/>`;
        },
    },

    rounded: {
        render: ({ cx, cy, dotRadius, dotColor, className, style, dataAttrs }) => {
            const size = dotRadius * 2;
            const rx = Math.max(1, Math.round(dotRadius * 0.4));
            return `<rect x="${cx - dotRadius}" y="${cy - dotRadius}" width="${size}" height="${size}" rx="${rx}" ry="${rx}" fill="${dotColor}" class="${className}" style="${style}"${dataAttrs}/>`;
        },
    },

    diamond: {
        render: ({ cx, cy, dotRadius, dotColor, className, style, dataAttrs }) =>
            `<polygon points="${cx},${cy - dotRadius} ${cx + dotRadius},${cy} ${cx},${cy + dotRadius} ${cx - dotRadius},${cy}" fill="${dotColor}" class="${className}" style="${style}"${dataAttrs}/>`,
    },
};

const shapeRegistry = {
    getShape(name) {
        return shapes[name] || shapes.circle;
    },

    /**
     * @param {string} name
     * @param {{ render: (ctx: object) => string }} shape
     */
    register(name, shape) {
        if (typeof shape.render !== 'function') {
            throw new Error(`Shape "${name}" must have a render(ctx) function`);
        }
        shapes[name] = shape;
    },

    getAvailableShapes() {
        return Object.keys(shapes);
    },

    hasShape(name) {
        return name in shapes;
    },
};

export default shapeRegistry;
export { shapes };
