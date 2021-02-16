using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Football_Scores_App.Models
{
    public class LeagueTopScorersDto
    {
        public class Root
        {
            [JsonProperty("results")]
            public long Results { get; set; }

            [JsonProperty("response")]
            public List<Response> Response { get; set; }
        }

        public class Response
        {
            [JsonProperty("player")]
            public Player Player { get; set; }

            [JsonProperty("statistics")]
            public List<Statistic> Statistics { get; set; }
        }

        public class Player
        {
            [JsonProperty("name")]
            public string Name { get; set; }
        }

        public partial class Statistic
        {
            [JsonProperty("team")]
            public Team Team { get; set; }

            [JsonProperty("goals")]
            public Goals Goals { get; set; }
        }

        public partial class Goals
        {
            [JsonProperty("total")]
            public long Total { get; set; }

            [JsonProperty("assists")]
            public long? Assists { get; set; }
        }
    }
    
}
