import { LightningElement, api } from 'lwc';
import { formatString } from 'c/constants';

const DIVIDERS = {
    DIV: 8,
    PERCENT: 50,
    COMMON_NUMBER: 25,
    THREE_DIGIT_NUMBER: 30
};

const MAX_PERCENT_FONT_SIZE = 2;
const COLOR_OPACITY_TEMPLATE = 'rgb({0}, {1})';

/** Displays Opportunity zone completion as a circle progress */

export default class ProgressRing extends LightningElement {

    @api primaryColor = 'rgb(0, 109, 204)';
    @api maxValue = 5;
    @api formattedValue;
    @api percent = 0;       /** @property {Decimal} percent % value of 100% */
    @api strokeWidth = 3;   /** @property {Integer} strokeWidth Circle stroke width */
    @api radius = 20;       /** @property {Integer} radius Circle radius */

    get percentValue() {
        return this.formattedValue || this.percent;
    }

    get numberStyle() {
        return this.percent.toString().length < 3 ? this.commonNumberStyle : this.threeDigitNumberStyle;
    }

    get numberX() {
        return this.percent.toString().length < 3 ? '47.5%' : '42.5%';
    }

    get percentX() {
        return this.percent.toString().length < 2 ? '57.5%' : this.percent.toString().length > 3 ? '72.5%' : '67.5%';
    }

    get diameter() {
        return this.radius * 2;
    }

    get normalizedRadius() {
        return this.radius - this.strokeWidth / 2;
    }

    get circumference() {
        return this.normalizedRadius * 2 * Math.PI;
    }

    get dashArray() {
        return `${this.circumference} ${this.circumference}`;
    }

    get circle1Style() {
        return `stroke: ${this.getPrimaryColorWithOpacity(0.3)};`;
    }

    get circle2Style() {
        return `stroke: ${this.primaryColor}; stroke-dashoffset: ${this.circumference - Math.min(this.percent, this.maxValue) / this.maxValue * this.circumference}`;
    }

    get divStyle() {
        return `width: ${this.radius/8}rem; height: ${this.radius/DIVIDERS.DIV}rem; margin: auto;`;
    }

    get percentStyle() {
        return `font-weight: 300; font-size: ${this.radius/DIVIDERS.PERCENT}rem;`
    }

    get commonNumberStyle() {
        const countedSize = this.radius / DIVIDERS.COMMON_NUMBER;
        return `font-weight: bold; font-size: ${countedSize > MAX_PERCENT_FONT_SIZE ? MAX_PERCENT_FONT_SIZE : countedSize}rem;`
    }

    get threeDigitNumberStyle() {
        let countedSize;
        if (this.percent === 100) {
            countedSize = 1.75;
        } else {
            countedSize = this.radius / DIVIDERS.THREE_DIGIT_NUMBER;
        }
        return `font-weight: bold; font-size: ${countedSize > MAX_PERCENT_FONT_SIZE ? MAX_PERCENT_FONT_SIZE : countedSize}rem;`
    }

    getPrimaryColorWithOpacity(opacity) {
        return formatString(
            COLOR_OPACITY_TEMPLATE,
            this.primaryColor.substring(
                this.primaryColor.indexOf("(") + 1, 
                this.primaryColor.indexOf(")")
            ),
            opacity
        );
    }
}