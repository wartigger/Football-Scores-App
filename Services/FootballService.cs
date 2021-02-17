﻿using Football_Scores_App.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Text.RegularExpressions;

namespace Football_Scores_App.Services
{
    public class FootballService
    {
        public Client client = new Client();

        public TestClient testClient = new TestClient();
        public string country = "England";

        public async Task<CountriesDto> GetCountriesAsync() 
        {
            //var responseCountries = await client.httpClient.GetStringAsync("https://api-football-v1.p.rapidapi.com/v3/countries");


            var responseCountries = await testClient.httpClient.GetStringAsync("https://api.jsonbin.io/b/6027abc1435c323ba1c5ad1e/1");

            CountriesDto countries = JsonConvert.DeserializeObject<CountriesDto>(responseCountries);

            return countries;
        }

        public async Task<LeaguesDto> GetLeaguesAsync(string country)
        {
            LeaguesDto leagues = new LeaguesDto();

            if (country == "England") {
                var responseLeagues = await testClient.httpClient.GetStringAsync("https://api.jsonbin.io/b/602ab7ee6b568373f8c23e90");
                leagues = JsonConvert.DeserializeObject<LeaguesDto>(responseLeagues);
            }

            //var responseLeagues = await client.httpClient.GetStringAsync("https://api-football-v1.p.rapidapi.com/v3/leagues?country={country}");

            return leagues;
        }

        public async Task<LeagueDto> GetLeagueStandingsAsync(int leagueId)
        {
            LeagueDto leagueInfo = new LeagueDto();

            if (leagueId == 39)
            {
                var responseLeague = await testClient.httpClient.GetStringAsync("https://api.jsonbin.io/b/602ab82599ac3873a349fc86");
                leagueInfo = JsonConvert.DeserializeObject<LeagueDto>(responseLeague);
            }

            //var responseLeagues = await client.httpClient.GetStringAsync("https://api-football-v1.p.rapidapi.com/v3/standings?season=2020&league=39");

            return leagueInfo;
        }

        public async Task<LeagueTopScorersDto.Root> GetLeagueTopScorersAsync(int leagueId, int season)
        {
            LeagueTopScorersDto.Root leagueTopScorers = new LeagueTopScorersDto.Root();

            if (leagueId == 39 && season == 2020)
            {
                var responseLeague = await testClient.httpClient.GetStringAsync("https://api.jsonbin.io/b/602c342f0665b21b00b85d12");
                leagueTopScorers = JsonConvert.DeserializeObject<LeagueTopScorersDto.Root>(responseLeague);
            }

            //var responseLeagues = await client.httpClient.GetStringAsync("https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=39&season=2020");

            return leagueTopScorers;
        }

        public async Task<object> GetLeagueResultsAsync(int leagueId, int season)
        {
            LeagueFixturessDto.Root leagueFixtures = new LeagueFixturessDto.Root();

            var responseLeague = await testClient.httpClient.GetStringAsync("https://api.jsonbin.io/b/602d1b300665b21b00b8d50b");
            leagueFixtures = JsonConvert.DeserializeObject<LeagueFixturessDto.Root>(responseLeague);

            var fixturesByRound = leagueFixtures.Response
                .GroupBy(match => match.League.Round)
                .Select(fixture => new
                {
                    round = $"Round {fixture.Key.Split(' ').Last()}",
                    data = fixture.Select(data => new
                    {
                        date = data.Fixture.Date.ToString("yyyy-MM-dd HH:mm"),
                        data.Teams,
                        data.Goals
                    }),
                });

            return fixturesByRound;
            //var responseLeagues = await client.httpClient.GetStringAsync("https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=2020&status=FT");
        }


        public async Task<object> GetLeagueTeamInfoAsync(int leagueId, int season, int teamId)
        {
            LeagueFixturessDto.Root leagueFixtures = new LeagueFixturessDto.Root();

            var responseLeague = await testClient.httpClient.GetStringAsync("https://api.jsonbin.io/b/602d9b595605851b065f097f");
            leagueFixtures = JsonConvert.DeserializeObject<LeagueFixturessDto.Root>(responseLeague);

            var fixturesByRound = leagueFixtures.Response
                .GroupBy(match => match.League.Round)
                .Select(fixture => new
                {
                    round = $"Round {fixture.Key.Split(' ').Last()}",
                    data = fixture.Select(data => new
                    {
                        date = data.Fixture.Date.ToString("yyyy-MM-dd HH:mm"),
                        data.Teams,
                        data.Goals
                    }),
                });

            return fixturesByRound;
            //var responseLeagues = await client.httpClient.GetStringAsync("https://api-football-v1.p.rapidapi.com/v3/players?team=33&league=39&season=2020");
        }
    }

    public class Client
    {
        public HttpClient httpClient;
        public Client() {

            httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("x-rapidapi-key", "23b475f27amshe981062a40ea82bp1c4350jsn00eea16fa137");
            httpClient.DefaultRequestHeaders.Add("x-rapidapi-host", "api-football-v1.p.rapidapi.com");
        }
    }



    public class TestClient
    {
        public HttpClient httpClient;
        public TestClient()
        {
            httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("secret-key", "$2b$10$Gdof0ZFuRwXv20NwKwPT8.oH/kp02AtJlE4Apg6YpjrzT.nOH9bDm");
        }
    }
}
