function simpleThrottle(targetFunction, cooldown) {
	let inCooldown;
	return function(...args) {
		const context = this;
		if(!inCooldown) {
			targetFunction.apply(context, args);
			inCooldown = true;
			setTimeout(() => (inCooldown = false), cooldown);
		}
	}
}

const removeSummarizeBtns = () => {
	const summarizeBtns = document.querySelectorAll('button[aria-label="Summarize"]');
	summarizeBtns.forEach(el => el.remove());
};

const throttledBtnRemoval = simpleThrottle(removeSummarizeBtns, 500);

document.addEventListener('mousemove', throttledBtnRemoval);
