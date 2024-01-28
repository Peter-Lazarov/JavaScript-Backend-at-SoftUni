const mongoose = require('mongoose');
const connectionString = 'mongodb://0.0.0.0:27017/test1'; //replace localhost with 0.0.0.0

async function start() {
    await mongoose.connect(connectionString);
    console.log('connected');

    const studentSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30
        },
        age: Number
    });

    studentSchema.methods.getInfo = function () {
        return `Hello, I'm ${this.name} and I'm ${this.age} years old.`
    }

    studentSchema.virtual('talk').get(function () {
        return `All my inforamtion is name - ${this.name} and age ${this.age}.`
    })

    studentSchema.path('age').validate(function () {
        console.log('in validate function');
        return this.age > 2 && this.age < 120
    }, 'Name must be between 2 and 10 symbols long');

    const Student = mongoose.model('Student', studentSchema);
    const studentGosho = new Student({
        name: 'Gosho',
        age: 17
    });
    //console.log(studentGosho);

    //console.log(studentGosho.getInfo());
    //console.log(studentGosho.talk);

    //const savedGosho = await studentGosho.save();
    //console.log(savedGosho);

    //Validate example
    const studentIvan = new Student({
        name: 'Ivan',
        age: 35,
    });

    //const result = await studentIvan.validate();
    //const result = await studentIvan.save();
    //console.log(result);

    //const searchName = await Student.find({name: {$in: ['Ivan', 'Peter']}});
    //console.log(searchName);

    //const searchId = await Student.findById('65b3d0f23b626b3362d670ab');
    //console.log(searchId);

    //const updateOne = await Student.updateOne({name: 'Peter'}, {$set: {age: 21}});
    //console.log(updateOne);

    //const searchId = await Student.findByIdAndDelete('65b3d0f23b626b3362d670ab');
    //console.log(searchId);

    //const deleteOne = await Student.deleteOne({name: 'Ivan'});
    //console.log(deleteOne);

    // const deleteMany = await Student.deleteMany({age: {$in: [17, 35]}});
    // console.log(deleteMany);

    // const sortQueryDescending = await Student.find({}).sort({age: -1});
    // console.log(sortQueryDescending);

    // const sortQueryAscending = await Student.find({}).sort({age: 1});
    // console.log(sortQueryAscending);
    
    // const studentTodor = new Student({
    //     name: 'Todor',
    //     age: 20,
    // });

    // const studentPavel = new Student({
    //     name: 'Pavel',
    //     age: 22,
    // });

    //const savedTodor = await studentTodor.save();
    //const savedPavel = await studentPavel.save();

    // const limitSkip = await Student.find({}).sort({age:-1}).skip(1).limit(3);
    // console.log(limitSkip);

    //search within range
    const searchedStudents = await Student
    .find({})
    .where('age').gte(20).lte(25)
    .select(['name', 'age']); //or only 'name'

    console.log(searchedStudents);
}

start()
