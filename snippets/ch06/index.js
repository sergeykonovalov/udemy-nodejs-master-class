console.log('Before');
setTimeout(() => {
    console.log('Inside of timed out...');
}, 2000);
console.log('After');