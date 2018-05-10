using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIApplication.Models
{
    public class Category
    {
        public long CategoryId { get; set; }
        public string CategoryName { get; set; }

        public long RoomId { get; set; }
        public Room Room { get; set; }

        public List<Vote> Votes { get; set; }
    }
}
