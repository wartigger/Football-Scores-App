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


        [HttpGet("standings/{leagueId}/{season}")]
        public async Task<LeagueStandingsDto.Root> GetLeagueStandings(int leagueId, int season)
        {
            LeagueStandingsDto.Root league = new LeagueStandingsDto.Root();

            league = await _footballService.GetLeagueStandingsAsync(leagueId, season);

            return league;
        }

        [HttpGet("top-scorers/{leagueId}/{season}")]
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

        [HttpGet("squad/{leagueId}/{season}/{teamId}")]
        public async Task<object> GetLeagueTeamSquad(int leagueId, int season, int teamId)
        {
            //LeagueFixturessDto.Root leagueTopScorers = new LeagueFixturessDto.Root();

            var leagueTeamSquad = await _footballService.GetLeagueTeamSquadAsync(leagueId, season, teamId);

            return leagueTeamSquad;
        }
    }
}
