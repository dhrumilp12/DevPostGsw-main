// This service is responsible for managing team member data via the team API.
const { teamApi } = require('../api/squareClient');


// Searches for team members with a status of "ACTIVE" and other possible filters.
async function searchTeamMembers() {
  // Submits a search query to retrieve team members, handling pagination and API response.
    const body = {
        query: {
            filter: {
                status: "ACTIVE"  // You can customize this as needed
                // Add more filters as necessary, such as locationIds if required
            }
        },
        limit: 10  // Adjust the limit as necessary
    };

    try {
        const response = await teamApi.searchTeamMembers(body);
        console.log("Team Members:", response.result.teamMembers);
        return response.result.teamMembers;
    } catch (error) {
        console.error('Failed to search team members:', error);
        throw error;
    }
}

  /*async function getTeamMember(teamMemberId) {
    try {
      const response = await teamApi.retrieveTeamMember(teamMemberId);
      const teamMember = response.result.teamMember;
      console.log(teamMember);
      return teamMember;
    } catch (error) {
      console.error(`Failed to retrieve team member with ID ${teamMemberId}:`, error);
      throw error;
    }
  }*/
  
  
  module.exports = { searchTeamMembers};