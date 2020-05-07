chrome.runtime.onInstalled.addListener(() => {

    let staticStorage = {
        docWriter: {
            preferences: {
                autoLoad: 1,
                saveLastSession: 1
            },
            documents: {
                activeDocs: {
                    docId: [],
                    limit: {
                      word: [],
                      page: []
                    },
                    prevSession: [],
                    currSession: []
                },
                inactiveDocs: {
                    docId: []
                }
            }
        }
    };

    chrome.storage.sync.set(staticStorage);

    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({pageUrl:{hostEquals:'docs.google.com'}})],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

});