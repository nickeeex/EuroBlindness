using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIApplication.Models
{
    public class Vote
    {
        public long VoteId { get; set; }

        public int Points { get; set; }

        public long UserId { get; set; }
        public User User { get; set; }

        public long CategoryId { get; set; }
        public Category Category { get; set; }

        public long ContestantId { get; set; }
        public Contestant Contestant { get; set; }
    }
}
