let staticStorage = {
    docWriter: {
        preferences: {
            autoLoad: 1,
            saveLastSession: 1
        },
        documents: {
            activeDocs: {
                docId: [],
                link: [],
                title: [],
                limit: {
                    deadline: [],
                    word: [],
                    page: []
                },
                progress: [],
                prevSession: [],
                currSession: []
            },
            inactiveDocs: {
                docId: [],
                title: []
            }
        }
    }
};