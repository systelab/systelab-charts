import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class DecimalFormatService {

	/**
	 * @fieldOf decimalFormat
	 * @type String
	 */
	prefix = '';
	/**
	 * @fieldOf decimalFormat
	 * @type String
	 */
	suffix = '';
	/**
	 * @description Grouping size
	 * @fieldOf decimalFormat
	 * @type String
	 */
	comma = 0;
	/**
	 * @description Minimum integer digits to be displayed
	 * @fieldOf decimalFormat
	 * @type Number
	 */
	minInt = 1;
	/**
	 * @description Minimum fractional digits to be displayed
	 * @fieldOf decimalFormat
	 * @type String
	 */
	minFrac = 0;
	/**
	 * @description Maximum fractional digits to be displayed
	 * @fieldOf decimalFormat
	 * @type String
	 */
	maxFrac = 0;

	/**
	 * @description Formats given value
	 * @methodOf decimalFormat
	 * @param numStr
	 * @param formatStr
	 * @return Formatted number
	 * @author Oskan Savli
	 */
	public execute(numStr, formatStr: string) {
		this.configureService(formatStr);
		// 1223.06 --> $1,223.06
		// remove prefix, suffix and commas
		let numberStr = this.formatBack(numStr)
			.toLowerCase();

		// do not format if not a number
		if (isNaN(numberStr) || numberStr.length === 0) {
			return numStr;
		}

		const indexE = numberStr.indexOf('e');
		//scientific numbers
		if (indexE !== -1) {
			if (numberStr.indexOf('e') !== -1) {
				return numberStr;
			}
		}

		let negative = false;
		// remove sign
		if (numberStr.charAt(0) === '-') {
			negative = true;
			numberStr = numberStr.substring(1);
		} else if (numberStr.charAt(0) === '+') {
			numberStr = numberStr.substring(1);
		}

		const point = numberStr.indexOf('.'); // position of point character
		let intStr: string;
		let fracStr = '';
		if (point !== -1) {
			intStr = numberStr.substring(0, point);
			fracStr = numberStr.substring(point + 1);
		} else {
			intStr = numberStr;
		}
		fracStr = fracStr.replace(/[.]/, ''); // remove other point characters

		const isPercentage = this.suffix && this.suffix.charAt(0) === '%';
		// if percentage, number will be multiplied by 100.
		const minInt = this.minInt; const minFrac = this.minFrac; const maxFrac = this.maxFrac;
		if (isPercentage) {
			// copy two digits from frac to int
			// with padding cases: '1.' -> 100., '1.1' -> 110., '1.0111' -> 101.11
			intStr = intStr + ('00' + (fracStr + '00').substr(0, 2)).substr(-2);
			fracStr = fracStr.substr(2);
		}

		if (fracStr.length > maxFrac) { // round
			//case 6143
			let num = Number('0.' + fracStr);
			num = (maxFrac === 0) ? Math.round(num) : Number(num.toFixed(maxFrac));
			// toFixed method has bugs on IE (0.7 --> 0)
			fracStr = num.toString(10)
				.substr(2);
			let c = (num >= 1) ? 1 : 0; //carry
			let x;
			let strLength = intStr.length - 1;
			while (c) { //increment intStr
				if (strLength === -1) {
					intStr = '1' + intStr;
					break;
				} else {
					x = intStr.charAt(strLength);
					if (x === 9) {
						x = '0';
						c = 1;
					} else {
						x = (++x) + '';
						c = 0;
					}
					intStr = intStr.substring(0, strLength) + x + intStr.substring(strLength + 1, intStr.length);
					strLength--;
				}
			}
		}
		for (let i = fracStr.length; i < minFrac; i++) { // if minFrac=4 then 1.12 --> 1.1200
			fracStr = fracStr + '0';
		}
		while (fracStr.length > minFrac && fracStr.charAt(fracStr.length - 1) === '0') { // if minInt=4 then 00034 --> 0034)
			fracStr = fracStr.substring(0, fracStr.length - 1);
		}

		for (let i = intStr.length; i < minInt; i++) { // if minInt=4 then 034 --> 0034
			intStr = '0' + intStr;
		}
		while (intStr.length > minInt && intStr.charAt(0) === '0') { // if minInt=4 then 00034 --> 0034)
			intStr = intStr.substring(1);
		}

		let j = 0;
		for (let i = intStr.length; i > 0; i--) { // add commas
			if (j !== 0 && j % this.comma === 0) {
				intStr = intStr.substring(0, i) + ',' + intStr.substring(i);
				j = 0;
			}
			j++;
		}

		let formattedValue;
		if (fracStr.length > 0) {
			formattedValue = this.prefix + intStr + '.' + fracStr + this.suffix;
		} else {
			formattedValue = this.prefix + intStr + this.suffix;
		}

		if (negative) {
			formattedValue = '-' + formattedValue;
		}

		return formattedValue;
	}

	private configureService(formatStr: string) {
		// get prefix
		for (let i = 0; i < formatStr.length; i++) {
			if (formatStr.charAt(i) === '#' || formatStr.charAt(i) === '0') {
				this.prefix = formatStr.substring(0, i);
				formatStr = formatStr.substring(i);
				break;
			}
		}

		// get suffix
		this.suffix = formatStr.replace(/[#]|[0]|[,]|[.]/g, '');

		// get number as string
		const numberStr = formatStr.replace(/[^0#,.]/g, '');

		let intStr: string;
		let fracStr = '';
		const point = numberStr.indexOf('.');
		if (point !== -1) {
			intStr = numberStr.substring(0, point);
			fracStr = numberStr.substring(point + 1);
		} else {
			intStr = numberStr;
		}

		const commaPos = intStr.lastIndexOf(',');
		if (commaPos !== -1) {
			this.comma = intStr.length - 1 - commaPos;
		}

		intStr = intStr.replace(/[,]/g, ''); // remove commas

		fracStr = fracStr.replace(/[,]|[.]+/g, '');

		this.maxFrac = fracStr.length;
		let tmp = intStr.replace(/[^0]/g, ''); // remove all except zero
		if (tmp.length > this.minInt) {
			this.minInt = tmp.length;
		}
		tmp = fracStr.replace(/[^0]/g, '');
		this.minFrac = tmp.length;
	}

	/**
	 * @description Converts formatted value back to non-formatted value
	 * @methodOf decimalFormat
	 * @param fNumStr Formatted number
	 * @return Original number
	 * @author Oskan Savli
	 */
	private formatBack(fNumStr: string) { // $1,223.06 --> 1223.06
		fNumStr += ''; //ensure it is string
		if (!fNumStr) {
			return '';
		} //do not return undefined or null
		if (!isNaN(Number(fNumStr))) {
			return this.getNumericString(fNumStr);
		}
		let fNumberStr = fNumStr;
		let negative = false;
		if (fNumStr.charAt(0) === '-') {
			fNumberStr = fNumberStr.substr(1);
			negative = true;
		}
		const pIndex = fNumberStr.indexOf(this.prefix);
		const sIndex = (this.suffix === '') ? fNumberStr.length : fNumberStr.indexOf(this.suffix, this.prefix.length + 1);
		if (pIndex === 0 && sIndex > 0) {
			// remove suffix
			fNumberStr = fNumberStr.substr(0, sIndex);
			// remove prefix
			fNumberStr = fNumberStr.substr(this.prefix.length);
			// remove commas
			fNumberStr = fNumberStr.replace(/,/g, '');
			if (negative) {
				fNumberStr = '-' + fNumberStr;
			}
			if (!isNaN(Number(fNumberStr))) {
				return this.getNumericString(fNumberStr);
			}
		}
		return fNumStr;
	}

	/**
	 * @description We shouldn't return strings like 1.000 in formatBack method.
	 * However, using only Number(str) is not enough, because it omits . in big numbers
	 * like 23423423423342234.34 => 23423423423342236 . There's a conflict in cases
	 * 6143 and 6541.
	 * @methodOf decimalFormat
	 * @param str Numberic string
	 * @return Corrected numeric string
	 * @author Serdar Bicer
	 */
	private getNumericString(str) {
		//first convert to number
		const num = Number(str);
		//check if there is a missing dot
		const numStr = num + '';
		if (str.indexOf('.') > -1 && numStr.indexOf('.') < 0) {
			//check if original string has all zeros after dot or not
			for (let i = str.indexOf('.') + 1; i < str.length; i++) {
				//if not, this means we lost precision
				if (str.charAt(i) !== '0') {
					return str;
				}
			}
			return numStr;
		}
		return str;
	}
}
