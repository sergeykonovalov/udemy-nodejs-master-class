const p = new Promise(function(resolve, reject) {
    let asyncDelay = Math.round(Math.random() * 5000);
    console.log(`Awaiting ${asyncDelay} msec...`);
    setTimeout(() => {
        let rand = Math.round(Math.random() * 100);
        if (rand < 50) {
            reject(rand);
        } else {
            resolve(rand);
        }
    }, asyncDelay)
});

p.then(result => console.log(`OK: ${result}`)).catch(error => console.log(`NOK: ${error}`));

async function getUsername(id) {
    console.log('Fetching username...');
    return new Promise((resolve, reject) => {
        setTimeout((id) => {
            resolve('sergeykonovalov');
        }, 1000);
    });
}

function getRepositories(username) {
    console.log('Fetching repositories...');
    return new Promise((resolve, reject) => {
        setTimeout((username) => {
            resolve(['repository1', 'repository2']);
        }, 1000);
    });
}

function getCommits(repository) {
    console.log('Fetching commits...');
    return new Promise((resolve, reject) => {
        setTimeout((repository) => {
            resolve(['commit1', 'commit2']);
        }, 1000);
    });
}

let userId = 42;

getUsername(userId)
    .then((username) => getRepositories(username))
    .then((repositories) => getCommits(repositories[0]))
    .then((commits) => console.log('Commits:', commits))
    .catch((error) => console.log('Error:', error));

// Async / Await

async function displayCommits() {
    try {
        let username = await getUsername(1);
        let repositories = await getRepositories(username);
        let commits = await getCommits(repositories[0]);
        console.log('Commits:', commits);
    } catch(error) {
        console.log('Error:', error);
    }
}

displayCommits();