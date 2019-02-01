const node = str => new DOMParser().parseFromString(str, 'text/html').body.firstChild;

export default function DebugGrid({
	columns = 12,
	maxWidth = '1344px',
	marginWidth = '40px',
	gutterWidth = '16px',
	columnWidth = '1fr',
	verticalRhythm = '20px',
} = {}) {

	const grid = 'g' + Math.random().toString(36).substr(2, 9);
	const gridInner = 'i' + Math.random().toString(36).substr(2, 9);

	const styleTag = document.createElement('style');
	styleTag.id = 'debug-grid-overlay';
	styleTag.innerHTML = `
		.${grid} {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 10000;
			pointer-events: none;
		}

		.${gridInner} {
			display: grid;
			grid-template-columns: repeat(24, ${columnWidth});
			column-gap: ${gutterWidth};
			height: 100%;
			background-color: rgba(14, 109, 14, 0.1);
			margin-left: auto;
			margin-right: auto;
			${maxWidth ? `max-width: ${maxWidth};` : ''}
			${marginWidth ? `padding-left: ${marginWidth};` : ''}
			${marginWidth ? `padding-right: ${marginWidth};` : ''}
			box-sizing: content-box;
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
	`.replace(/\n/g, '').replace(/\s\s+/g, ' ');

	const overlay = node(`
		<div class="${grid}">
			<div class="${gridInner}">
				${Array.from({length: columns}, () => `<div></div>`).join('')}
			</div>
		</div>
	`);

	function toggle() {
		if (document.body.contains(overlay)) {
			document.head.removeChild(styleTag);
			document.body.removeChild(overlay);
		} else {
			document.head.insertAdjacentElement('beforeend', styleTag);
			document.body.append(overlay);
		}
	}

	window.addEventListener('keydown', e => {
		if (event.keyCode === 71) { // Lowercase "g"
			toggle();
		}
	});

	return { toggle };
}
