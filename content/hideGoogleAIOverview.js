let hasFoundSearch = false;
(() => {
  if(window.location?.href.startsWith('https://www.google.com/search')) {
    const AIElementFlag = 'AI Overview';
    let killRecursion = false;

    const observeElementChanges = () => {
      let onMutationsObserved = function(mutations, thisObserver) {
        for(const mutation of mutations)
          for(const aNode of mutation.addedNodes)
            recurseThroughChildNodes(aNode, thisObserver);
      };
      const config = { childList: true, subtree: true };
      const observer = new MutationObserver(onMutationsObserved);
      observer.observe(document, config);
    }

    const recurseThroughChildNodes = (insertedNode, theObserver) => {
      if(killRecursion) return;

      if(insertedNode.nodeName === 'DIV' && insertedNode.innerText === AIElementFlag) {
        let hveidElement = insertedNode.closest('div[data-subtree="mfc"]');
        if(!hveidElement)
          return true;

        hveidElement = hveidElement.closest('div[data-hveid]');
        if(!hveidElement)
          return true;

        const collapseButton = createCompleteElement('button', {
          id: 'googleAccordion', innerText: 'Show or Hide AI Overview',
          title: 'Use ALT+A to toggle this button using your keyboard.'
        });

        hveidElement?.insertAdjacentElement('beforebegin', collapseButton);
        boxTheAIOverview(hveidElement);
        showAndHideAIOverview(collapseButton, hveidElement);

        theObserver.disconnect();
        killRecursion = true;
        return;
      }

      if(insertedNode.childNodes?.length > 0)
        for(const subNode of insertedNode.childNodes)
          recurseThroughChildNodes(subNode, theObserver);
    }

    observeElementChanges();
  }
})();

//NOTE: this is imperfect. Google's ideal layout makes this textbox appear a bit larger than info above it.
function fixAskAnythingMargins(OVElement) {
  setTimeout(() => {
    let displayContentsDiv = OVElement.querySelector('div[style="display: contents;"]');
    if(displayContentsDiv) {
      let grandParentDiv = displayContentsDiv.parentElement?.parentElement;
      grandParentDiv.style.marginLeft = '5px';
      grandParentDiv.style.marginRight = '5px';
      hasFoundSearch = true;
    }
  }, 500);
}

function boxTheAIOverview(overviewElement) {
  let collapsibleContainer = createCompleteElement('div', { id: 'collapsingAIContent' });
  overviewElement.insertAdjacentElement('beforebegin', collapsibleContainer);
  collapsibleContainer.append(overviewElement);
}

function showAndHideAIOverview(collapseButton, overviewElement) {
  collapseButton.addEventListener('click', function() {
    this.classList.toggle('active');
    let content = this.nextElementSibling;

    if(content.style.maxHeight)
      content.style.maxHeight = '';
    else
      content.style.maxHeight = '100%';

    if(!hasFoundSearch)
      fixAskAnythingMargins(overviewElement);
  });

  document.addEventListener('keydown', (e) => {
    if(e.altKey && e.key === 'a')
      collapseButton.click();
  })
}

function createCompleteElement(eleTag, attributes) {
  return Object.assign(document.createElement(eleTag), attributes);
}
