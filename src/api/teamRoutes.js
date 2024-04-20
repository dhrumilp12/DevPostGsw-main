const express = require('express');
const router = express.Router();
const { searchTeamMembers } = require('../services/teamService');

// Route to list team members
router.post('/members/search', async (req, res) => {
    try {
        const members = await searchTeamMembers(req.body);  // passing body if filters need to be dynamic
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: 'Error searching team members', error: error.message });
    }
});

// Route to get a single team member
/*router.get('/members/:id', async (req, res) => {
    try {
        const member = await getTeamMember(req.params.id);
        res.json(member);
    } catch (error) {
        res.status(500).json({ message: `Error fetching team member with ID ${req.params.id}`, error: error.message });
    }
});*/

  module.exports = router;