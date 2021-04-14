require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
  name: {type: String, required: true},
  age:  Number,
  favoriteFoods: [String]
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Person = mongoose.model('Person', personSchema);

const samplePerson = {
  name: 'Phil',
  age: 21,
  favoriteFoods: ['Chocolate', 'Tea']
}

const createAndSavePerson = (done) => {
  const document = new Person(samplePerson);
  document.save((err, data) => {
    if(err) done(err);
    done(null, data)
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if(err) done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  return Person.find({name: personName}, (err, data) => {
    if(err) done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  return Person.findOne({favoriteFoods: food}, (err, data) => {
    if(err) done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  return Person.findById(personId, (err, data) => {
    if(err) done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  return Person.findById(personId, (err, data) => {
    if(err) done(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, updatedData) => {
      if(err) done(err);
      done(null, updatedData);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  return Person.findOneAndUpdate(
    {name: personName},
    {age: ageToSet},
    {new: true},
    (err, data) => {
      if(err) done(err);
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
