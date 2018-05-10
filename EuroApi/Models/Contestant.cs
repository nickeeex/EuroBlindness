using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIApplication.Models
{
    public class Contestant
    {
        [Key]
        public long ContestantId { get; set; }
        public string ContestantName { get; set; }
        public string EntryName { get; set; }
        public string CountryName { get; set; }
        public int StartingOrder { get; set; }
        public string YouTubeUri { get; set; }
        public string OfficialPageUri { get; set; }
        public bool IsActive { get; set; }

        public ICollection<Vote> Votes { get; set; }
    }
}
