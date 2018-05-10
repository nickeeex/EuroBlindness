using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIApplication.Models
{
    public class User
    {
        public long UserId { get; set; }
        public string Name { get; set; }

        // This is the subject we get from auth0
        public string UserSub { get; set; }
        public bool IsAdmin { get; set; }

        public Room Room { get; set; }
        public List<Vote> Votes { get; set; }
    }
}
