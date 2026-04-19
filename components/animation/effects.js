/**
 * Flip Effect Registry
 * dot이 뒤집히는 시각적 효과를 플러그인으로 관리
 *
 * 각 효과는 3가지 CSS 상태를 정의:
 *   off - dot이 꺼진 상태
 *   mid - 전환 중간 상태 (애니메이션 중간 keyframe)
 *   on  - dot이 켜진 상태
 *
 * {dotOn}, {dotOff} 플레이스홀더는 런타임에 실제 색상으로 치환됨
 *
 * 커스텀 효과 추가 예시:
 *   import flipEffectRegistry from './components/animation/effects.js';
 *   flipEffectRegistry.register('spin', {
 *     off: 'fill: {dotOff}; transform: rotate(0deg);',
 *     mid: 'fill: {dotOff}; transform: rotate(90deg);',
 *     on:  'fill: {dotOn}; transform: rotate(180deg);',
 *   });
 */

const effects = {
    rotate: {
        // 기본 효과: Z축 + Y축 대각선 회전 (실제 flip-dot과 유사)
        off: 'fill: {dotOff}; transform: rotateZ(0deg) rotateY(0deg);',
        mid: 'fill: {dotOff}; transform: rotateZ(45deg) rotateY(90deg);',
        on:  'fill: {dotOn}; transform: rotateZ(90deg) rotateY(180deg);',
    },

    flip: {
        // 수평 회전 (rotateY만 사용)
        off: 'fill: {dotOff}; transform: rotateY(0deg);',
        mid: 'fill: {dotOff}; transform: rotateY(90deg);',
        on:  'fill: {dotOn}; transform: rotateY(180deg);',
    },

    squeeze: {
        // 가로 방향으로 찌그러졌다 펴지는 효과 (반만 뒤집히는 느낌)
        off: 'fill: {dotOff}; transform: scaleX(1);',
        mid: 'fill: {dotOff}; transform: scaleX(0);',
        on:  'fill: {dotOn}; transform: scaleX(1);',
    },

    fade: {
        // 페이드 인/아웃
        off: 'fill: {dotOff}; opacity: 1;',
        mid: 'fill: {dotOn}; opacity: 0.3;',
        on:  'fill: {dotOn}; opacity: 1;',
    },

    scale: {
        // 점이 작아졌다 커지며 색이 바뀌는 효과
        off: 'fill: {dotOff}; transform: scale(0.15);',
        mid: 'fill: {dotOn}; transform: scale(0.6);',
        on:  'fill: {dotOn}; transform: scale(1);',
    },
};

function resolveColors(template, colors) {
    return template
        .replace(/\{dotOff\}/g, colors.dotOff)
        .replace(/\{dotOn\}/g, colors.dotOn);
}

const flipEffectRegistry = {
    /**
     * 색상이 적용된 효과 상태 객체 반환
     * @returns {{ off: string, mid: string, on: string }}
     */
    resolve(effectName, colors) {
        const effect = effects[effectName] || effects.rotate;
        return {
            off: resolveColors(effect.off, colors),
            mid: resolveColors(effect.mid, colors),
            on:  resolveColors(effect.on, colors),
        };
    },

    /**
     * @param {string} name
     * @param {{ off: string, mid: string, on: string }} effect
     */
    register(name, effect) {
        if (!effect.off || !effect.mid || !effect.on) {
            throw new Error(`Effect "${name}" must define off, mid, and on states`);
        }
        effects[name] = effect;
    },

    getAvailable() {
        return Object.keys(effects);
    },

    hasEffect(name) {
        return name in effects;
    },
};

export default flipEffectRegistry;
export { effects };
