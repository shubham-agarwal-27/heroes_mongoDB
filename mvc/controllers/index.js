const mongoose = require('mongoose');
const Hero = mongoose.model('Hero');

let data = require('../../Default_heroes');
let heroData = data.heroes;

getIndex = function(req, res, next) {
    res.render('index', { title: 'Mongoose' });
}



getHeroesIndex = function(req, res){


	Hero.find((err, heroes) => {
		if(err){
			return res.send({error: err});
		}
		res.render('heroes', {title: "Hall Of Heroes", heroes: heroes});
	});
}



getHeroesForm = function(req, res){
	res.render('create-a-hero', {title: "Create A Hero"});
}



createNewHero = function({body}, res){
	let hero = {
		name: body.name,
		description: body.desc,
		stats: {
			strength: body.strength,
			perception: body.perception,
			endurance: body.endurance,
			charisma: body.charisma,
			intelligence: body.intelligence,
			agility: body.agility,
			luck: body.luck,
		}
	}

	body.origin && (hero.origin = body.origin)

	Hero.create(hero, (err, newHero) => {
		if(err){
			return res.send({error: err});
		}
		res.redirect("/heroes");
	});

}



deleteHero = function({params}, res){
	Hero.findByIdAndRemove(params.heroid, (err, hero) => {
		if(err){
			return res.send({error: err});
		}
		res.redirect("/heroes");
	});
}


getUpdateForm = function({params}, res){
	Hero.findById(params.heroid, (err, hero) => {
		if(err){
			return res.send({error: err});
		}
		res.render("update-hero", {title: "Update Hero", hero: hero});
	});
}


updateHero = function({params, body}, res){
	Hero.findById(params.heroid, (err, hero) => {
		if(err){
			return res.send({error: err});
		}
		hero.name = body.name;
		hero.description = body.desc;
		hero.origin = body.origin;
		hero.stats.strength = body.strength;
		hero.stats.perception = body.perception;
		hero.stats.endurance = body.endurance;
		hero.stats.charisma = body.charisma;
		hero.stats.intelligence = body.intelligence;
		hero.stats.agility = body.agility;
		hero.stats.luck = body.luck;

		hero.save((err, updatedHero) => {
			if(err){
				return res.send({error: err});
			}
			res.redirect("/heroes");
		});
	});
}


reset = function(req, res){
	Hero.deleteMany({}, (err, info) => {
		if(err){
			return res.send({error: err});
		}

		Hero.insertMany(heroData, (err, info) => {
			if(err){
				return res.send({error: err});
			}
			res.redirect("/heroes");
		});
	});
}


module.exports = {
    getIndex,
    getHeroesIndex,
    getHeroesForm,
    createNewHero,
    deleteHero,
    getUpdateForm,
    updateHero,
    reset
};