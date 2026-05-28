let hasRun = false;
const addHoverBackground = () => {
	if(hasRun) return;

	const shredditComments = document.querySelectorAll('shreddit-comment');
	const newSheetStyle = new CSSStyleSheet();
	newSheetStyle.insertRule('summary div.flex.relative:hover { background-color: rgba(255, 255, 255, 0.1); }')

	shredditComments.forEach((shComment) => {
		hasRun = true;
		const commentShadowRoot = shComment.shadowRoot;
		if(commentShadowRoot)
			commentShadowRoot.adoptedStyleSheets = [...commentShadowRoot.adoptedStyleSheets, newSheetStyle]
	})
}

document.onreadystatechange = addHoverBackground;
setTimeout(addHoverBackground, 3000);
