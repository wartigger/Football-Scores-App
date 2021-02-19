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

        [HttpGet("{country}")]
        public async Task<object> GetLeagues(string country)
        {
            var leagues = await _footballService.GetLeaguesAsync(country);

            return leagues;
        }
    }
}
