using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Football_Scores_App.Models;
using Football_Scores_App.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Football_Scores_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        private readonly FootballService _footballService;

        public LeagueController(FootballService footballService)
        {
            _footballService = footballService;
        }

        // GET api/League/leagueId
        [HttpGet("{leagueId}")]
        public async Task<LeagueDto> GetLeagueInfo(int leagueId)
        {
            LeagueDto league = new LeagueDto();

            league = await _footballService.GetLeagueInfoAsync(leagueId);

            return league;
        }

        // POST api/<LeagueController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<LeagueController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LeagueController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
