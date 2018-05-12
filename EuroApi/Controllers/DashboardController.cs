using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using WebAPIApplication.Models;

namespace WebAPIApplication.Controllers
{
    [Route("api/dashboard")]
    public class DashboardController : Controller
    {
        private readonly EuroContext _context;
        private readonly ILogger<DashboardController> _logger;
        private readonly IConfiguration _configuration;
        const string RoomNameSpace = "https://euroblindness/roomId";
        public DashboardController(EuroContext context, ILogger<DashboardController> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet]
        [Authorize]
        [Route("ranking")]
        public IActionResult GetRanking()
        {

            var categories = _context.Categories.Where(x => x.RoomId == GetRoomIdentifier())
                .ToDictionary(k => k.CategoryId, v => v.CategoryName);

            var contestants = _context.Contestants.ToDictionary(k => k.ContestantId, v => v.CountryName);
            var users = _context.Users.ToDictionary(k => k.UserId, v => v.Name);
            var votes = _context.Votes.Where(x=>x.User.Room.RoomId == GetRoomIdentifier()).ToList();

            var votesPerContestant = votes.GroupBy(v => v.ContestantId);
            var top = votesPerContestant.Select(key => new
            {
                 Points = key.Sum(f => f.Points),
                 ContestantId = key.Key
            }).OrderByDescending(f=>f.Points).Take(7);

            var votesPerCategory = votes.GroupBy(v => v.CategoryId);
            var topPerCategory = votesPerCategory.ToDictionary(k => k.Key, v => new
            {
               Votes = v.GroupBy(f => f.ContestantId).Select(r => new
                {
                   Points = r.Sum(e=>e.Points),
                   ContestantId = r.Key
                }).OrderByDescending(r=>r.Points).Take(3)
            });

            var votesPerUser = votes.GroupBy(v => v.UserId);
            var topVoters = votesPerUser.Select(key => new
            {
                Points = key.Sum(f => f.Points),
                User = key.Key
            }).OrderByDescending(f => f.Points).Take(8);

            return Ok(new
            {
                categories,
                contestants,
                users,
                top,
                topPerCategory,
                topVoters
            });

        }

        [HttpGet]
        [Authorize]
        [Route("contestant")]
        public IActionResult GetRandomContestant()
        {
            var stuff = _context.Contestants.Where(x => x.Votes.Any());
            if (!stuff.Any())
            {
                return Ok(new Dictionary<string, string>());
            }
            var randomContestant = stuff.OrderBy(r => Guid.NewGuid()).Take(1).Single();

            var categories = _context.Categories.Where(x => x.RoomId == GetRoomIdentifier())
                .ToDictionary(k => k.CategoryId, v => v.CategoryName);

            var users = _context.Users.ToDictionary(k => k.UserId, v => v.Name);

            var votesByCategory = _context.Votes
                .Where(x => x.ContestantId == randomContestant.ContestantId).ToList()
                .GroupBy(x => x.CategoryId);


            var returnDict = new Dictionary<string, string>();
            foreach (var votes in votesByCategory)
            {
                var maxPoints = votes.Max(x => x.Points);
                var whereMax = votes.Where(x => x.Points == maxPoints).Select(x=>x.UserId);
                var userNames = users.Where(x => whereMax.Contains(x.Key)).Select(x=>x.Value).Take(2);
                returnDict.Add(categories[votes.Key], string.Join(",", userNames) );
            }
            return Ok(new
            {
               CountryName = randomContestant.CountryName,
               Categories = returnDict
            });
        }

        private long GetRoomIdentifier()
        {
            return Convert.ToInt64(User.Claims.Single(x => x.Type == RoomNameSpace).Value);
        }
    }
}

