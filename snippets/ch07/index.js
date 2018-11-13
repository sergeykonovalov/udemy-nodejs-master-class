const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to Mongo.'))
    .catch((error) => console.log('Error connecting', error));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function saveCourse() {
    const course = new Course({
        name: 'React Native',
        author: 'Udemy',
        tags: ['javascript', 'mobile'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course
    // .find({ author: { $in: ['Udemy', 'Udacity'] }, isPublished: true, price: { $gte: 10, $lte: 30 } })
    .find()
    // .or([ { author: 'Udemy'}, { isPublished: true } ])
    .and([ { author: 'Udemy'}, { isPublished: true } ])
    .limit(10)
    .sort({ name: 1 }) // 1 = ascending, -1 for descending; can use also '-name'
    .select({ name: 1, tags: 1 }); // can use also 'name tags'
    console.log(courses);
}

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;
    course.isPublished = false;
    course.author = 'Mr. Author';
    course.price = 4.99;
    course.tags = ['some', 'more', 'tags'];
    // course.set({ price: 4.99 });
    const result = await course.save();
}

async function updateFirst(id) {
    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Online Education',
            published: false
        }
    });
    console.log(result);
}

async function deleteCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

// saveCourse();
// getCourses();
// updateCourse('5beb32e0c09dd2861d3c260f');
// updateFirst('5beb32e0c09dd2861d3c260f');
deleteCourse('5beb32e0c09dd2861d3c260f');