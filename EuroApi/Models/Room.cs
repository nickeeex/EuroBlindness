using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebAPIApplication.Models
{
    public class Room
    {
        [Key]
        public long RoomId { get; set; }
        public string Name { get; set; }
        public string RoomCode { get; set; }

        public List<Category> Categories { get; set; }
        public List<Vote> Votes { get; set; }
        public List<User> Users { get; set; }
    }
}
