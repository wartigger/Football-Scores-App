using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Football_Scores_App.Models
{
    public class LeagueFixturessDto
    {
        public class Root 
        {
            [JsonProperty("results")]
            public int? Results { get; set; }

            [JsonProperty("response")]
            public List<Response> Response { get; set; }
        }

        public class Response
        {
            [JsonProperty("fixture")]
            public Fixture Fixture { get; set; }

            [JsonProperty("league")]
            public League League { get; set; }

            [JsonProperty("teams")]
            public Teams Teams { get; set; }

            [JsonProperty("goals")]
            public Goals Goals { get; set; }
        }

        public class Fixture
        {
            [JsonProperty("date")]
            public DateTime Date { get; set; }
        }

        public partial class League
        {
            [JsonProperty("round")]
            public string Round { get; set; }
        }

        public class Teams 
        {
            [JsonProperty("home")]
            public Home Home { get; set; }

            [JsonProperty("away")]
            public Away Away { get; set; }
        }

        public partial class Home
        {
            [JsonProperty("id")]
            public int? Id { get; set; }

            [JsonProperty("name")]
            public string Name { get; set; }

            [JsonProperty("logo")]
            public Uri Logo { get; set; }
        }

        public partial class Away
        {
            [JsonProperty("id")]
            public int? Id { get; set; }

            [JsonProperty("name")]
            public string Name { get; set; }

            [JsonProperty("logo")]
            public string Logo { get; set; }
        }

        public class Goals
        {
            [JsonProperty("home")]
            public int Home { get; set; }

            [JsonProperty("away")]
            public int Away { get; set; }
        }
    }
}
