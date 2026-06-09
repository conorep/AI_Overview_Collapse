const addHoverBackground = () => {
	const shredditComments = document.querySelectorAll('shreddit-comment');
	if(shredditComments.length) {
		const newStyle = document.createElement('style');
		newStyle.textContent = 'div[slot="commentMeta"]:hover { background-color: rgba(255, 255, 255, 0.1); }';
		document.head.appendChild(newStyle);
	}
}

window.onload = addHoverBackground;
