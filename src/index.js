const node = str => new DOMParser().parseFromString(str, 'text/html').body.firstChild;

function EventEmitter() {
	const topic = {};

	return {
		on(name, listener) {
			if (!topic[name]) {
				topic[name] = { queue: [] };
			}
			topic[name].queue.push(listener) - 1;
		},
		emit(name, data) {
			if (!topic[name] || topic[name].queue.length === 0) {
				return;
			}
			topic[name].queue.forEach(callback => callback(data));
		},
	};
}

const getCssBlock = (selector, property, values) => {
	const block = (value) => `.${selector} { ${property}: ${ value }; }`;
	if (typeof values === 'object') {
		return Object.keys(values).map(key => {
			if (key === '&') {
				return block(values[key]);
			} else {
				return `@media screen and (${key}) { ${block(values[key])} }`;
			}
		}).join('');
	}
	return block(values);
};

export default function debugGrid({
	columns = 12,
	maxWidth = null,
	marginsWidth = null,
	gutterWidth = '16px',
	columnWidth = '1fr',
	verticalRhythm = '20px',
	keyCode = 71, // Lowercase "g"
} = {}) {
	const { emit, on } = new EventEmitter();

	const grid = 'g' + Math.random().toString(36).substr(2, 9);
	const gridInner = 'i' + Math.random().toString(36).substr(2, 9);

	let css = `
		.${grid} {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 10000;
			margin: 0;
			padding: 0;
			pointer-events: none;
		}

		.${gridInner} {
			display: grid;
			height: 100%;
			background-color: rgba(14, 109, 14, 0.1);
			margin-left: auto;
			margin-right: auto;
			box-sizing: content-box;
			grid-template-columns: repeat(${columns}, ${columnWidth});
			column-gap: ${gutterWidth};
		}

		.${gridInner}::before {
			content: "";
			position: absolute;
			left: calc(50% - 1px);
			width: 1px;
			height: 100%;
			background: #bbb;
			opacity: 0.6;
		}

		.${gridInner}::after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			opacity: 0.4;
			background-image: linear-gradient(to bottom, cyan 0, transparent 1px);
			background-repeat: repeat-y;
			background-size: 100% ${verticalRhythm};
		}

		.${gridInner} > div {
			margin-top: 0;
			background-color: rgba(255, 192, 203, 0.2);
		}
	`;

	css += Object.entries(arguments[0]).map(([key, value]) => {
		const cases = {
			marginsWidth() {
				return [
					getCssBlock(gridInner, 'padding-left', value),
					getCssBlock(gridInner, 'padding-right', value),
				].join('');
			},
			maxWidth() {
				return getCssBlock(gridInner, 'max-width', value);
			},
			gutterWidth() {
				return getCssBlock(gridInner, 'column-gap', value);
			},
			default() {
				return '';
			},
		};
		return (cases[key] || cases['default'])();
	}).join('');

	const styleTag = document.createElement('style');
	styleTag.id = 'debug-grid-overlay';
	styleTag.innerHTML = css.replace(/\n/g, '').replace(/\s\s+/g, ' ');

	const overlay = node(`
		<div class="${grid} .debug-grid-overlay">
			<div class="${gridInner}">
				${Array.from({length: columns}, () => `<div></div>`).join('')}
			</div>
		</div>
	`);

	function toggle() {
		if (document.body.contains(overlay)) {
			document.head.removeChild(styleTag);
			document.body.removeChild(overlay);
			emit('toggled', false);
		} else {
			document.head.insertAdjacentElement('beforeend', styleTag);
			document.body.append(overlay);
			emit('toggled', true);
		}
	}

	window.addEventListener('keydown', e => {
		if (event.keyCode === keyCode) {
			toggle();
		}
	});

	return { toggle, on };
}
