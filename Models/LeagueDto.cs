using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Football_Scores_App.Models
{
    public class LeagueStandingsDto
    {
        public class Root
        {
            [JsonProperty("response")]
            public List<Response> Response { get; set; }

            [JsonProperty("results")]
            public int Results { get; set; }
        }

        public class Response
        {
            [JsonProperty("league")]
            public League League { get; set; }
        }

        public class League
        {
            [JsonProperty("id")]
            public int Id { get; set; }

            [JsonProperty("name")]
            public string Name { get; set; }

            [JsonProperty("country")]
            public string Country { get; set; }

            [JsonProperty("logo")]
            public string Logo { get; set; }

            [JsonProperty("flag")]
            public string Flag { get; set; }

            [JsonProperty("season")]
            public int Season { get; set; }

            [JsonProperty("standings")]
            public List<List<Standing>> Standings { get; set; }
        }

        public partial class Standing
        {
            [JsonProperty("rank")]
            public long Rank { get; set; }

            [JsonProperty("team")]
            public Team Team { get; set; }

            [JsonProperty("points")]
            public int Points { get; set; }

            [JsonProperty("all")]
            public All All { get; set; }

            [JsonProperty("home")]
            public All Home { get; set; }

            [JsonProperty("away")]
            public All Away { get; set; }
        }

        public partial class Team
        {
            [JsonProperty("id")]
            public long Id { get; set; }

            [JsonProperty("name")]
            public string Name { get; set; }

            [JsonProperty("logo")]
            public Uri Logo { get; set; }
        }

        public partial class All
        {
            [JsonProperty("played")]
            public long Played { get; set; }

            [JsonProperty("win")]
            public long Win { get; set; }

            [JsonProperty("draw")]
            public long Draw { get; set; }

            [JsonProperty("lose")]
            public long Lose { get; set; }

            [JsonProperty("goals")]
            public Goals Goals { get; set; }
        }

        public partial class Goals
        {
            [JsonProperty("for")]
            public long For { get; set; }

            [JsonProperty("against")]
            public long Against { get; set; }
        }
    }
}
