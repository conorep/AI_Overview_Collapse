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

        if(!hveidElement.parentElement?.dataset?.hveid) {
          hveidElement = hveidElement.parentElement.parentElement
          if(!hveidElement.dataset?.hveid)
            return true;
        }

        const collapseButton = createCompleteElement('button', {
          id: 'googleAccordion', innerText: 'Show or Hide AI Overview'
        });

        hveidElement?.insertAdjacentElement('beforebegin', collapseButton);
        boxTheAIOverview(hveidElement);
        showAndHideAIOverview(collapseButton)

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

function boxTheAIOverview(overviewElement) {
  let collapsibleContainer = createCompleteElement('div', { id: 'collapsingAIContent' });
  overviewElement.insertAdjacentElement('beforebegin', collapsibleContainer);
  collapsibleContainer.append(overviewElement);
}

function showAndHideAIOverview(collapseButton) {
  collapseButton.addEventListener('click', function() {
    this.classList.toggle('active');
    let content = this.nextElementSibling;

    if(content.style.maxHeight)
      content.style.maxHeight = '';
    else
      content.style.maxHeight = '100%';
  });
}

function createCompleteElement(eleTag, attributes) {
  return Object.assign(document.createElement(eleTag), attributes);
}
