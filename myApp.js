require('dotenv').config()
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
})

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Martin Gattix",
    age: 23,
    favoriteFoods: ["Mame Daifuku"]
  })
  person.save((err, data) => {
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, person) => {
    person.favoriteFoods.push(foodToAdd)
    person.save((err, data) => {
      done(null, data);
    })
  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(personName, { age: ageToSet }, { new: true }, (err, data) => {
    done(null, data);
  })

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    done(null, data);
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .limit(2)
    .select('-age')
    .exec((err, data) => {
      done(null, data);
    })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
