const addHoverBackground = () => {
	const shredditComments = document.querySelectorAll('shreddit-comment');
	const newSheetStyle = new CSSStyleSheet();
	newSheetStyle.insertRule('summary div.flex.relative:hover { background-color: rgba(255, 255, 255, 0.1); }')

	shredditComments.forEach((shComment) => {
		const commentShadowRoot = shComment.shadowRoot;
		commentShadowRoot.adoptedStyleSheets = [...commentShadowRoot.adoptedStyleSheets, newSheetStyle]
	})
}

document.onreadystatechange = addHoverBackground;
