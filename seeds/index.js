const mongoose=require('mongoose')
const cities = require('./cities')
const {places, descriptors}=require('./seedHelpers')
const Campground = require ('../models/campground')

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open', ()=>{
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB= async ()=>{
    await Campground.deleteMany({});

    for(let i = 0;i<200;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*2000)*1000;
        const camp = new Campground({
            author: '63a471d67653b3760b03e677',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet, repellendus iure fugiat, doloremque unde odit architecto quas ipsa nisi, reprehenderit mollitia accusantium. Sit recusandae doloremque, tempora sed fugit totam aut.',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dks6bjiak/image/upload/v1671989084/YelpCamp/vcnh1meavzcweo8rtjol.jpg',
                  filename: 'YelpCamp/vcnh1meavzcweo8rtjol',
                },
                {
                  url: 'https://res.cloudinary.com/dks6bjiak/image/upload/v1671989084/YelpCamp/yclxuuzyhp9w6unql0re.jpg',
                  filename: 'YelpCamp/yclxuuzyhp9w6unql0re',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})