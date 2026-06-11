const loadStyleInsert = () => {
	const shredditComments = document.querySelectorAll('shreddit-comment');

	if(shredditComments.length) {
		const newStyle = document.createElement('style');
		newStyle.textContent = 'div[slot="commentMeta"]:hover { background-color: rgba(255, 255, 255, 0.1); }';
		document.head.appendChild(newStyle);
	}
}

const addHoverBackground = () => {
	const shredditComments = document.querySelectorAll('shreddit-comment');

	if(shredditComments.length) {
		const newSheetStyle = new CSSStyleSheet();
		newSheetStyle.insertRule('summary div.flex.relative:hover { background-color: rgba(255, 255, 255, 0.1); }');

		shredditComments.forEach((shComment) => {
			const commentShadowRoot = shComment.shadowRoot;
			if(!shComment.classList.contains('alreadyAdded') && commentShadowRoot) {
				shComment.classList.add('alreadyAdded');
				commentShadowRoot.adoptedStyleSheets = [...commentShadowRoot.adoptedStyleSheets, newSheetStyle];
			}
		})
	}
}

window.onload = loadStyleInsert;
document.onreadystatechange = addHoverBackground;
document.addEventListener('scroll', addHoverBackground);
