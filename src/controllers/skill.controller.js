const Skill = require('../models/skill.model');
const authorization = require('../middlewares/authorization');

const addSkill = async (req, res) => {
  const { skill } = req.body;
    try{
        const newSkill = await Skill.create({name : skill});
        return res.status(201).json(newSkill);

    }
    catch (err) {
        return res.status(500).json({ message: error.message });
      }
    
 
};

module.exports = {
  addSkill,
};
