using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Football_Scores_App.Models
{
    public class LeaguesDto
    {
        public class Root
        {
            [JsonProperty("response")]
            public List<LeagueData> LeagueData { get; set; }
        }

        public class LeagueData
        {
            [JsonProperty("league")]
            public League League { get; set; }

            [JsonProperty("country")]
            public Country Country { get; set; } // Located in CountriesDto Model
        }

        public class League
        {
            [JsonProperty("id")]
            public int Id { get; set; }

            [JsonProperty("name")]
            public string Name { get; set; }

            [JsonProperty("logo")]
            public string Logo { get; set; }
        }
    }
}
