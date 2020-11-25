import React from 'react';
import ReactDOM from 'react-dom';

export function entryWrap(Component) {
	function resize() {
		const docEle = window.document.documentElement;
		const windowWidth = docEle.getBoundingClientRect().width;

		if (windowWidth >= 640) {
			docEle.style.fontSize = "40px"
		} else {
			if (windowWidth <= 320) {
				docEle.style.fontSize = "20px"
			} else {
				docEle.style.fontSize = windowWidth / 320 * 20 + "px"
			}
		}
	}

	window.addEventListener("resize", resize);

	resize();

	ReactDOM.render(<Component/>, document.getElementById('app'));
}
