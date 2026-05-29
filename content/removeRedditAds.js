const adRemoval = (elementSelector) => {
  let targetElements = document.querySelectorAll(elementSelector);
  if(targetElements?.length)
    targetElements.forEach((el) => el.remove());
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
