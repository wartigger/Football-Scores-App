using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Football_Scores_App.Models;
using Football_Scores_App.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Football_Scores_App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FootballController : ControllerBase
    {
        private readonly FootballService _footballService;

        public FootballController(FootballService footballService)
        {
            _footballService = footballService;
        }

        [HttpGet]
        public async Task<List<Country>> GetCountries()
        {
            CountriesDto countries = new CountriesDto();

            countries = await _footballService.GetCountriesAsync();

            return countries.Country;
        }

        //[HttpGet("{country}")]
        //[HttpGet]
        //[Route("Leagues")]
        //public async Task<List<LeagueData>> GetLeagues(string country)
        //{
        //    LeaguesDto leagues = new LeaguesDto();

        //    leagues = await _footballService.GetLeaguesAsync(country);

        //    return leagues.LeagueData;
        //}
    }
}
