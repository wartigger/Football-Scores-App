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
    public class LeaguesController : ControllerBase
    {
        private readonly FootballService _footballService;

        public LeaguesController(FootballService footballService)
        {
            _footballService = footballService;
        }

        // GET api/<LeaguesController>/England
        [HttpGet("{country}")]
        public async Task<List<LeagueData>> GetLeagues(string country)
        {
            LeaguesDto leagues = new LeaguesDto();

            leagues = await _footballService.GetLeaguesAsync(country);

            return leagues.LeagueData;
        }

        // POST api/<LeaguesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<LeaguesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<LeaguesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
