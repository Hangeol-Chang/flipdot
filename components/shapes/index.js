/**
 * Shape Registry
 * dot 셀(배경 + 악센트 + 도형) 렌더링을 shape 파일별로 관리
 *
 * 각 shape의 render(ctx)는 셀 전체를 SVG 문자열로 반환한다.
 * ctx: { cx, cy, cellX, cellY, dotRadius, dotSize, isOn, dotOnColor, colors, className, style, dataAttrs }
 *
 * 새로운 shape 추가:
 *   1. components/shapes/variants/myshape.js 파일 작성
 *   2. 아래 import + shapes 객체에 등록
 *   또는 런타임에 shapeRegistry.register('name', { render }) 호출
 */

import circle   from './variants/circle.js';
import rect     from './variants/rect.js';
import octagon  from './variants/octagon.js';

const shapes = { circle, rect, octagon };

const shapeRegistry = {
    getShape(name) {
        return shapes[name] || shapes.circle;
    },

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
