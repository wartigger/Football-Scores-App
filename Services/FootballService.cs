using Football_Scores_App.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

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

            //var responseLeagues = await client.httpClient.GetStringAsync("https://api-football-v1.p.rapidapi.com/v3/leagues?country={country}");

            return leagueInfo;
        }

        public async Task<LeagueTopScorersDto> GetLeagueTopScorersAsync(int leagueId, int season)
        {
            LeagueTopScorersDto leagueTopScorers = new LeagueTopScorersDto();

            if (leagueId == 39 && season == 2020)
            {
                var responseLeague = await testClient.httpClient.GetStringAsync("https://api.jsonbin.io/b/602c342f0665b21b00b85d12");
                leagueTopScorers = JsonConvert.DeserializeObject<LeagueTopScorersDto>(responseLeague);
            }

            //var responseLeagues = await client.httpClient.GetStringAsync("https://api-football-v1.p.rapidapi.com/v3/leagues?country={country}");

            return leagueTopScorers;
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
