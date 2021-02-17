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

        [HttpGet("summary/{leagueId}")]
        public async Task<LeagueDto> GetLeagueStandings(int leagueId)
        {
            LeagueDto league = new LeagueDto();

            league = await _footballService.GetLeagueStandingsAsync(leagueId);

            return league;
        }

        [HttpGet("summary/{leagueId}/{season}")]
        public async Task<LeagueTopScorersDto.Root> GetLeagueTopScorers(int leagueId, int season)
        {
            LeagueTopScorersDto.Root leagueTopScorers = new LeagueTopScorersDto.Root();

            leagueTopScorers = await _footballService.GetLeagueTopScorersAsync(leagueId, season);

            return leagueTopScorers;
        }

        [HttpGet("fixtures/{leagueId}/{season}")]
        public async Task<object> GetLeagueResults(int leagueId, int season)
        {
            //LeagueFixturessDto.Root leagueTopScorers = new LeagueFixturessDto.Root();

            var leagueTopScorers = await _footballService.GetLeagueResultsAsync(leagueId, season);

            return leagueTopScorers;
        }
    }
}
