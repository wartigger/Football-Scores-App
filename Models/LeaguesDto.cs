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
            public List<Response> Response { get; set; }
        }

        public class Response
        {
            [JsonProperty("league")]
            public League League { get; set; }

            [JsonProperty("country")]
            public Country Country { get; set; }

            [JsonProperty("seasons")]
            public List<Seasons> Seasons { get; set; }

        }

        public class League
        {
            [JsonProperty("id")]
            public int? Id { get; set; }

            [JsonProperty("name")]
            public string Name { get; set; }

            [JsonProperty("logo")]
            public string Logo { get; set; }
        }

        public class Country
        {
            [JsonProperty("name")]
            public string Name { get; set; }

            [JsonProperty("flag")]
            public string Flag { get; set; }
        }

        public class Seasons
        {
            [JsonProperty("year")]
            public int? SeasonYear { get; set; }

            [JsonProperty("current")]
            public bool Current { get; set; }
        }
    }
}
