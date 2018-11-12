console.log('Before');
const user = getUser(1, function(id) {
    console.log(`Received ID: ${id}`);
    getRepositories(id, function(repositories) {
        console.log(repositories);
    });
});
console.log(user); // undefined
console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log(`Inside of timed out... { id: ${id} }`);
        callback({ id });
    }, 2000);
}

function getRepositories(id, callback) {
    setTimeout(() => {
        console.log('Inside of getRepositories()');
        callback(['repo1', 'repo2', 'repo3']);
    }, 3000);
}