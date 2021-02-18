using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Football_Scores_App.Models
{
    public class LeagueTeamSquadDto
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
            [JsonProperty("player")]
            public Player Player { get; set; }

            [JsonProperty("statistics")]
            public List<Statistic> Statistics { get; set; }
        }

        public class Player
        {
            [JsonProperty("name")]
            public string Name { get; set; }

            [JsonProperty("age")]
            public int? Age { get; set; }
        }

        public class Statistic
        {
            [JsonProperty("team")]
            public Team Team { get; set; }

            [JsonProperty("games")]
            public Games Games { get; set; }

            [JsonProperty("goals")]
            public Goals Goals { get; set; }

            [JsonProperty("cards")]
            public Cards Cards { get; set; }
        }
        public class Team 
        {
            [JsonProperty("name")]
            public string Name { get; set; }
        }

        public class Games
        {
            [JsonProperty("appearences")]
            public int Appearences { get; set; }

            [JsonProperty("position")]
            public string Position { get; set; }
        }

        public class Goals
        {
            [JsonProperty("total")]
            public int? Total { get; set; }
        }

        public class Cards
        {
            [JsonProperty("yellow")]
            public int Yellow { get; set; }

            [JsonProperty("red")]
            public int Red { get; set; }
        }
    }
}
