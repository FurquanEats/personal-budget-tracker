// In backend/src/controllers/groupController.js

const Group = require('../models/Group');
const GroupExpense = require('../models/GroupExpense');

// Get all groups for the logged-in user
exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({ where: { userId: req.userId } });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};

// Create a new group associated with the logged-in user
exports.createGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const newGroup = await Group.create({ name, userId: req.userId });
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
};

// Get details for a single group, ensuring the user owns it
exports.getGroupDetails = async (req, res) => {
  try {
    const group = await Group.findOne({
      where: { id: req.params.id, userId: req.userId },
      include: [{ model: GroupExpense, order: [['createdAt', 'DESC']] }]
    });
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch group details' });
  }
};

// Add a new expense to a group, ensuring the user owns the group
exports.addGroupExpense = async (req, res) => {
    try {
        // First, verify the user owns the group they are adding an expense to
        const group = await Group.findOne({ where: { id: req.params.id, userId: req.userId } });
        if (!group) {
            return res.status(404).json({ error: 'Group not found or you do not have permission.' });
        }
        
        // If the user owns the group, proceed to add the expense
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