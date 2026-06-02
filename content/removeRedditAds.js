const adRemoval = (elementSelector) => {
  let targetElements = document.querySelectorAll(elementSelector);
  if(targetElements?.length)
    targetElements.forEach((el) => el.remove());
}

const fixActionRowOverflow = () => {
  let postContent = document.querySelector('shreddit-post');
  if(!postContent) return;

  let shadowDoc = postContent.shadowRoot;
  if(!shadowDoc) return;

  let targetElement = shadowDoc.querySelector('div.shreddit-post-container');
  if(targetElement)
    targetElement.style.overflowX = 'auto';
}

const dynamicAdRemoval = () => {
  adRemoval('div[slot="credit-bar"]:not(div#pdp-credit-bar), div[slot="ad-format-content"],  shreddit-dynamic-ad-link');
  fixActionRowOverflow();
};

const readyStateAdRemoval = () => {
  if(document.readyState !== 'complete')
    return;
  dynamicAdRemoval();
  fixActionRowOverflow();
}

const shredditAdRemoval = () => adRemoval('shreddit-ad-post');

window.onload = dynamicAdRemoval;
document.addEventListener('readystatechange', readyStateAdRemoval);
document.addEventListener('scroll', shredditAdRemoval);
shredditAdRemoval();
