using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Auth0.AuthenticationApi;
using Auth0.AuthenticationApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using WebAPIApplication.Models;

namespace WebAPIApplication.Controllers
{
    [Route("api")]

    public class ApiController : Controller
    {
        private readonly EuroContext _context;
        private readonly ILogger<ApiController> _logger;
        private readonly IConfiguration _configuration;
        const string RoomNameSpace = "https://euroblindness/roomId";
        public ApiController(EuroContext context, ILogger<ApiController> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost]
        [Authorize]
        [Route("register")]
        public async Task<IActionResult> Register()
        {
            var dbUser = _context.Users.Include(user => user.Room).SingleOrDefault(x => x.UserSub == GetNameIdentifier());
            if (dbUser != null && dbUser.Room != null) {
                return Ok("Already registered and in a room");
            };

            if (dbUser == null) {
                var userInfo = await UserInformation();
                var user = new User
                {
                    UserSub = User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value,
                    IsAdmin = true,
                    Name = userInfo.FullName,
                    Room = await _context.FindAsync<Room>(GetRoomIdentifier())

                };
                await _context.AddAsync(user);

                
            }
            else if (dbUser.Room == null) {
                dbUser.Room = await _context.FindAsync<Room>(GetRoomIdentifier());
            }

            await _context.SaveChangesAsync();
            return Ok("User registered and joined default room");
        }


        [HttpGet]
        [Authorize]
        [Route("vote")]
        public IActionResult GetRoomInfo()
        {
            var dbUser = _context.Users.SingleOrDefault(x => x.UserSub == GetNameIdentifier());

            var categories = _context.Categories.Where(x=>x.RoomId == GetRoomIdentifier()).Select(x=> new
            {
                x.CategoryId,
                x.CategoryName
            });

            var result = _context.Contestants
                .Include(r => r.Votes).OrderBy(x=>x.StartingOrder).Select(x => new
                {
                    x.ContestantId,
                    x.ContestantName,
                    x.CountryName,
                    x.EntryName,
                    x.StartingOrder,
                    x.YouTubeUri,
                    x.OfficialPageUri,
                    Votes = x.Votes.Where(v => v.UserId == dbUser.UserId).Select(v => new
                    {
                        v.Points,
                        v.CategoryId
                    }).ToDictionary(k => k.CategoryId, v=>v.Points)
                });
           
            return Ok(new
            {
                categories,
                Contestants = result
            });
               
        }

        [HttpPost]
        [Authorize]
        [Route("vote")]
        public async Task<IActionResult> Vote([FromBody] VoteData voteData)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dbUser = _context.Users.Include(user => user.Room).SingleOrDefault(x => x.UserSub == GetNameIdentifier());
            var vote = await _context.Votes.FirstOrDefaultAsync(x => x.CategoryId == voteData.CategoryId && x.ContestantId == voteData.ContestantId && x.UserId == dbUser.UserId) ?? new Vote
            {
                CategoryId = voteData.CategoryId,
                ContestantId = voteData.ContestantId,
                UserId = dbUser.UserId
            };

            vote.Points = voteData.Points;

            _context.Update(vote);
            await _context.SaveChangesAsync();
            return Ok();
        }

        private string GetNameIdentifier()
        {
            return User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value;
        }
        private long GetRoomIdentifier()
        {
            return Convert.ToInt64(User.Claims.Single(x => x.Type == RoomNameSpace).Value);
        }
        private async Task<UserInfo> UserInformation()
        {
            // Retrieve the access_token claim which we saved in the OnTokenValidated event
            string accessToken = User.Claims.FirstOrDefault(c => c.Type == "access_token").Value;

            // If we have an access_token, then retrieve the user's information
            if (!string.IsNullOrEmpty(accessToken))
            {
                var apiClient = new AuthenticationApiClient(_configuration["Auth0:Domain"]);
                var userInfo = await apiClient.GetUserInfoAsync(accessToken);

                return userInfo;
            }

            return null;
        }


        [HttpGet]
        [Route("public")]
        public IActionResult Public()
        {
            return Json(new
            {
                Message = "Hello from a public endpoint! You don't need to be authenticated to see this."
            });
        }

        [HttpGet]
        [Route("private-scoped")]
        [Authorize("admin")]
        public IActionResult Scoped()
        {
            return Json(new
            {
                Message = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
            });
        }

        /// <summary>
        /// This is a helper action. It allows you to easily view all the claims of the token
        /// </summary>
        /// <returns></returns>
        [HttpGet("claims")]
        public IActionResult Claims()
        {
            return Json(User.Claims.Select(c =>
                new
                {
                    c.Type,
                    c.Value
                }));
        }
    }

    public class VoteData
    {
        [Required]
        [Range(1, long.MaxValue)]
        public long CategoryId { get; set; }

        [Required]
        [Range(1, long.MaxValue)]
        public long ContestantId { get; set; }

        [Range(0, 12)]
        [Required]
        public int Points { get; set; }
    }
}
/*

private string GenerateString(int size)
{
    Random rand = new Random();
    const string Alphabet = "abcdefghijklmnopqrstuvwyxz0123456789";
    char[] chars = new char[size];
    for (int i = 0; i < size; i++)
    {
        chars[i] = Alphabet[rand.Next(Alphabet.Length)];
    }
    return new string(chars);
}

[HttpPost]
[Authorize]
[Route("room/create/{name?}")]
public async Task<IActionResult> CreateRoom(string name = "")
{
    var dbUser = _context.Users.Include(user => user.Room).SingleOrDefault(x => x.UserSub == GetNameIdentifier());
    if (dbUser != null && dbUser.Room != null)
    {
        return BadRequest(Json(new
        {
            Message = $"You are already in a room '{dbUser.Room.Name}'"
        }));
    }

    var room = new Room()
    {
        Name = name,
        RoomCode = GenerateString(5),
        Categories = new List<Category> {
            new Category { CategoryName = "Show" },
            new Category { CategoryName = "Song" },
            new Category { CategoryName = "Overall" },
            new Category { CategoryName = "Panisin" }
        }
    };
    await _context.AddAsync(room);

    if (dbUser is null)
    {
        var userInfo = await UserInformation();
        var user = new User
        {
            UserSub = User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value,
            IsAdmin = true,
            Name = userInfo.FullName,
            Room = room

        };
        await _context.AddAsync(user);
    }
    else
    {
        dbUser.Room = room;
        _context.Update(dbUser);
    }
    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateException ex)
    {
        _logger.LogError(ex, "Could not create a room.");

        return BadRequest(Json(new
        {
            Message = "Unable to save changes. " +
            "Try again, and if the problem persists, " +
            "see your system administrator."
        }));
    }

    return CreatedAtAction(nameof(CreateRoom), new { id = room.RoomId }, new { room, _context.Contestants });
}

        [HttpPost]
        [Route("room/join/{roomKey}")]
        [Authorize]
        public IActionResult JoinRoom(string roomKey)
        {
            var dbUser = _context.Users.Include(user => user.Room).SingleOrDefault(x => x.UserSub == GetNameIdentifier());
            if (dbUser != null && dbUser.Room != null)
            {
                return BadRequest(Json(new
                {
                    Message = $"You are already in a room '{dbUser.Room.Name}'"
                }));
            }

            if (dbUser is null)
            {
                var userInfo = await UserInformation();
                var user = new User
                {
                    UserSub = User.Claims.Single(x => x.Type == ClaimTypes.NameIdentifier).Value,
                    IsAdmin = true,
                    Name = userInfo.FullName,
                    Room = room

                };
                await _context.AddAsync(user);
            }
            else
            {
                dbUser.Room = room;
                _context.Update(dbUser);
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Could not create a room.");

                return BadRequest(Json(new
                {
                    Message = "Unable to save changes. " +
                    "Try again, and if the problem persists, " +
                    "see your system administrator."
                }));
            }

            return CreatedAtAction(nameof(CreateRoom), new { id = room.RoomId }, new { room, _context.Contestants });
            return Json(new
            {
                Message = "Hello from a private endpoint! You need to be authenticated to see this."
            });
        }
        */
