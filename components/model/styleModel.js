import light from "./styles/light";
import dark from "./styles/dark";


const styleTypes = {
    light,
    dark,
}

const styleModel = {
    getModel : type => {
        if(styleTypes.hasOwnProperty(type)) {
            return styleTypes[type];
        } else {
            throw new Error(`The value of 'type=${type}' is invalid.`);
        }
    },
    style : function(packet) {
        let css = ``;

        // 필요에 따라 css에 추가

        return css;
    }
};

export default styleModel;