using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace Football_Scores_App.Models
{
    public class CountriesDto
    {
        [JsonProperty("response")]
        public List<Country> Country { get; set; }
    }

    public class Country
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("flag")]
        public string Flag { get; set; }
    }
}
