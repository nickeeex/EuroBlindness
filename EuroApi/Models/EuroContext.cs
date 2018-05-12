using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIApplication.Models
{
    public class EuroContext : DbContext
    {

        public EuroContext(DbContextOptions<EuroContext> options)
            : base(options)
        { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contestant>()
                .HasAlternateKey(c => c.StartingOrder)
                .HasName("AlternateKey_StartingOrder");

            modelBuilder.Entity<Room>()
                .HasAlternateKey(c => c.RoomCode)
                .HasName("AlternateKey_RoomCode");

            modelBuilder
                .Entity<Contestant>()
                .HasQueryFilter(p => p.IsActive);
        }

        public DbSet<Room> Rooms { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Contestant> Contestants { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vote> Votes { get; set; }
    }


    public static class DbInitializer
    {
        public static void Initialize(EuroContext context)
        {
            context.Database.EnsureCreated();

            // Look for any rooms.
            if (!context.Rooms.Any())
            {
                context.Database.OpenConnection();
                context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Rooms ON");
                context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Categories ON");

                var room = new Room()
                {
                    RoomId = 123,
                    Name = "EuroBlindness",
                    RoomCode = "Morski3Noob",
                    Categories = new List<Category> {
                    new Category { CategoryName = "Show", CategoryId = 1},
                    new Category { CategoryName = "Song", CategoryId = 2 },
                    new Category { CategoryName = "Overall", CategoryId = 3 },
                    new Category { CategoryName = "Panisin", CategoryId = 4 }
                }
                };
                context.Add(room);
                context.SaveChanges();

                context.Database.CloseConnection();
            }

            if (context.Contestants.Count() != 26)
            {
                var contestants = context.Contestants.AsNoTracking();
                context.Contestants.RemoveRange(contestants);
                context.SaveChanges();
            }


            if (!context.Contestants.Any())
			{
                context.Database.OpenConnection();
                context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Contestants ON");

                var contestants = new List<Contestant> {
                    new Contestant { CountryName = "Albania", OfficialPageUri = "https://eurovision.tv/participant/alfred-amaia", ContestantName = "Eugent Bushpepa", EntryName = "Mall", IsActive = true, YouTubeUri = "o-i2Rjbq8nw", StartingOrder = 12, ContestantId = 1 },
                    new Contestant { CountryName = "Australia", OfficialPageUri = "https://eurovision.tv/participant/jessica-mauboy", ContestantName = "Jessica Mauboy", EntryName = "We Got Love", IsActive = true, YouTubeUri = "J4XZxbrvepw", StartingOrder = 16, ContestantId = 2 },
                    new Contestant { CountryName = "Austria", OfficialPageUri = "https://eurovision.tv/participant/cesar-sampson", ContestantName = "Cesár Sampson", EntryName = "Nobody But You", IsActive = true, YouTubeUri = "I8MyztgOTv8", StartingOrder = 5, ContestantId = 3 },
                    new Contestant { CountryName = "Bulgaria", OfficialPageUri = "https://eurovision.tv/participant/Equinox", ContestantName = "EQUINOX", EntryName = "Bones", IsActive = true, YouTubeUri = "Uvy_R3fTHQ4", StartingOrder = 18, ContestantId = 4 },
                    new Contestant { CountryName = "Cyprus", OfficialPageUri = "https://eurovision.tv/participant/eleni-foureira", ContestantName = "Eleni Foureira", EntryName = "Fuego", IsActive = true, YouTubeUri = "eDSgs6syrgg", StartingOrder = 25, ContestantId = 5 },
                    new Contestant { CountryName = "Czech Republic", OfficialPageUri = "https://eurovision.tv/participant/mikolas-josef", ContestantName = "Mikolas Josef", EntryName = "Lie To Me", IsActive = true, YouTubeUri = "9zZPB3y70oU", StartingOrder = 14, ContestantId = 6 },
                    new Contestant { CountryName = "Denmark", OfficialPageUri = "https://eurovision.tv/participant/rasmussen", ContestantName = "Rasmussen", EntryName = "Higher Ground", IsActive = true, YouTubeUri = "XeraDSzu0nw", StartingOrder = 15, ContestantId = 7 },
                    new Contestant { CountryName = "Estonia", OfficialPageUri = "https://eurovision.tv/participant/elina-nechayeva", ContestantName = "Elina Nechayeva", EntryName = "La Forza", IsActive = true, YouTubeUri = "76KOUIfDry8", StartingOrder = 6, ContestantId = 8 },
                    new Contestant { CountryName = "Finland", OfficialPageUri = "https://eurovision.tv/participant/saara-aalto", ContestantName = "Saara Aalto", EntryName = "Monsters", IsActive = true, YouTubeUri = "y4xlvh6qW6M", StartingOrder = 17, ContestantId = 9 },
                    new Contestant { CountryName = "France", OfficialPageUri = "https://eurovision.tv/participant/madame-monsieur", ContestantName = "Madame Monsieur", EntryName = "Mercy", IsActive = true, YouTubeUri = "dHb-gWC-WTc", StartingOrder = 13, ContestantId = 10 },
                    new Contestant { CountryName = "Germany", OfficialPageUri = "https://eurovision.tv/participant/michael-schulte", ContestantName = "Michael Schulte", EntryName = "You Let Me Walk Alone", IsActive = true, YouTubeUri = "o_xTETHwIQg", StartingOrder = 11, ContestantId = 11 },
                    new Contestant { CountryName = "Hungary", OfficialPageUri = "https://eurovision.tv/participant/aws", ContestantName = "	AWS", EntryName = "	Viszlát Nyár", IsActive = true, YouTubeUri = "o_xTETHwIQg", StartingOrder = 21, ContestantId = 12 },
                    new Contestant { CountryName = "Ireland", OfficialPageUri = "https://eurovision.tv/participant/madame-monsieur", ContestantName = "Ryan O'Shaughnessy", EntryName = "Together", IsActive = true, YouTubeUri = "XAEjQXzW4Uc", StartingOrder = 24, ContestantId = 13 },
                    new Contestant { CountryName = "Israel", OfficialPageUri = "https://eurovision.tv/participant/netta-barzilai", ContestantName = "Netta", EntryName = "TOY", IsActive = true, YouTubeUri = "CziHrYYSyPc", StartingOrder = 22, ContestantId = 14 },
                    new Contestant { CountryName = "Italy", OfficialPageUri = "https://eurovision.tv/participant/ermal-meta-fabrizio-moro", ContestantName = "Ermal Meta e Fabrizio Moro", EntryName = "Non Mi Avete Fatto Niente", IsActive = true, YouTubeUri = "zguJGdoPPnw", StartingOrder = 26, ContestantId = 15 },
                    new Contestant { CountryName = "Lithuania", OfficialPageUri = "https://eurovision.tv/participant/Ieva-zasimauskaite", ContestantName = "Ieva Zasimauskaitė", EntryName = "When We're Old", IsActive = true, YouTubeUri = "CvG3sdGdGUA", StartingOrder = 4, ContestantId = 16 },
                    new Contestant { CountryName = "Moldova", OfficialPageUri = "https://eurovision.tv/participant/doredos", ContestantName = "	DoReDoS", EntryName = "My Lucky Day", IsActive = true, YouTubeUri = "pKLKeVC-9Y4", StartingOrder = 19, ContestantId = 17 },
                    new Contestant { CountryName = "Norway", OfficialPageUri = "https://eurovision.tv/participant/alexander-rybak-2018", ContestantName = "Alexander Rybak", EntryName = "That's How You Write A Song", IsActive = true, YouTubeUri = "Mvxni-WcD9A", StartingOrder = 7, ContestantId = 18 },
                    new Contestant { CountryName = "Portugal", OfficialPageUri = "https://eurovision.tv/participant/claudia-pascoal", ContestantName = "Cláudia Pascoal", EntryName = "O Jardim", IsActive = true, YouTubeUri = "kaVp4El9p3s", StartingOrder = 8, ContestantId = 19 },
                    new Contestant { CountryName = "Serbia", OfficialPageUri = "https://eurovision.tv/participant/sanja-ilic-balkanika", ContestantName = "	Sanja Ilić & Balkanika", EntryName = "Nova Deca", IsActive = true, YouTubeUri = "WkOFnIjGrkw", StartingOrder = 10, ContestantId = 20 },
                    new Contestant { CountryName = "Slovenia", OfficialPageUri = "https://eurovision.tv/participant/lea-sirk", ContestantName = "Lea Sirk", EntryName = "Hvala, ne!", IsActive = true, YouTubeUri = "kiysnSG6a3I", StartingOrder = 3, ContestantId = 21 },
                    new Contestant { CountryName = "Spain", OfficialPageUri = "https://eurovision.tv/participant/alfred-amaia", ContestantName = "Amaia y Alfred", EntryName = "Tu Canción", IsActive = true, YouTubeUri = "nO4mDiJRH6Q", StartingOrder = 2, ContestantId = 22 },
                    new Contestant { CountryName = "Sweden", OfficialPageUri = "https://eurovision.tv/participant/benjamin-ingrosso", ContestantName = "Benjamin Ingrosso", EntryName = "Dance You Off", IsActive = true, YouTubeUri = "U2UmYBkszOA", StartingOrder = 20, ContestantId = 23 }, 
                    new Contestant { CountryName = "The Netherlands", OfficialPageUri = "https://eurovision.tv/participant/waylon", ContestantName = "Waylon", EntryName = "Outlaw In 'Em", IsActive = true, YouTubeUri = "kLL9IlQ_7OA", StartingOrder = 23, ContestantId = 24 },
			        new Contestant { CountryName = "Ukraine", OfficialPageUri = "https://eurovision.tv/participant/melovin", ContestantName = "MELOVIN", EntryName = "Under The Ladder", IsActive = true, YouTubeUri = "E1yoAtjhkzQ", StartingOrder = 1, ContestantId = 25 },
                    new Contestant { CountryName = "United Kingdom", OfficialPageUri = "https://eurovision.tv/participant/surie", ContestantName = "SuRie", EntryName = "Storm", IsActive = true, YouTubeUri = "K--kIdOpbJM", StartingOrder = 9, ContestantId = 26 }
				};
				context.AddRange(contestants);
				context.SaveChanges();

                context.Database.CloseConnection();
            }


        }
    }

}
