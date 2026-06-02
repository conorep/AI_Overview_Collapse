const adRemoval = (elementSelector) => {
  let targetElements = document.querySelectorAll(elementSelector);
  if(targetElements?.length)
    targetElements.forEach((el) => el.remove());

  fixActionRowOverflow();
}

const fixActionRowOverflow = () => {
  let postContents = document.querySelectorAll('shreddit-post');
  if(!postContents) return;

  postContents.forEach((post) => {
    let shadowDoc = post.shadowRoot;
    if(!shadowDoc) return;

    let targetElement = shadowDoc.querySelector('div.shreddit-post-container');
    if(targetElement)
      targetElement.style.overflowX = 'auto';
  })
}

const dynamicAdRemoval = () => adRemoval('div[slot="credit-bar"]:not(div#pdp-credit-bar), div[slot="ad-format-content"],  shreddit-dynamic-ad-link');

const readyStateAdRemoval = () => {
  if(document.readyState !== 'complete')
    return;
  dynamicAdRemoval();
}

const shredditAdRemoval = () => adRemoval('shreddit-ad-post');

window.onload = dynamicAdRemoval;
document.addEventListener('readystatechange', readyStateAdRemoval);
document.addEventListener('scroll', shredditAdRemoval);
shredditAdRemoval();
