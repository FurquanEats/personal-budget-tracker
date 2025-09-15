const Group = require('../models/Group');
const GroupExpense = require('../models/GroupExpense');

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const newGroup = await Group.create({ name });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
};

exports.getGroupDetails = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.id, {
      include: [{ model: GroupExpense, order: [['createdAt', 'DESC']] }]
    });
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch group details' });
  }
};

exports.addGroupExpense = async (req, res) => {
  try {
    const { description, amount, paidBy } = req.body;
    const newExpense = await GroupExpense.create({
      description,
      amount,
      paidBy,
      GroupId: req.params.id
    });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};