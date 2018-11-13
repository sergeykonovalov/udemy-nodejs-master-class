const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to Mongo.'))
    .catch((error) => console.log('Error connecting', error));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublshed: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function saveCourse() {
    const course = new Course({
        name: 'React Native',
        author: 'Udemy',
        tags: ['javascript', 'mobile'],
        isPublshed: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
    .find({ author: { $in: ['Udemy', 'Udacity'] }, isPublshed: true, price: { $gte: 10, $lte: 30 } })
    .limit(10)
    .sort({ name: 1 }) // 1 = ascending, -1 for descending
    .select({ name: 1, tags: 1 }); 
    console.log(courses);
}

// saveCourse();
getCourses();