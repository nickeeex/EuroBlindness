using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIApplication.Models
{
    public class CategoryViewModel
    {
        public string CategoryName { get; set; }
    }
    public class ContestantViewModel
    {
        public long ContestantId { get; set; }
        public string ContestantName { get; set; }
        public string EntryName { get; set; }
        public string CountryName { get; set; }
        public string YouTubeUri { get; set; }
    }

    public class RoomViewModel
    {
        public List<CategoryViewModel> Categories { get; set; }
        public List<ContestantViewModel> Contestants { get; set; }
    }
}
