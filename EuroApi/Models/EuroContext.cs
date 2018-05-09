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

                var room = new Room()
                {
                    RoomId = 123,
                    Name = "EuroBlindness",
                    RoomCode = "Morski3Noob",
                    Categories = new List<Category> {
                    new Category { CategoryName = "Show" },
                    new Category { CategoryName = "Song" },
                    new Category { CategoryName = "Overall" },
                    new Category { CategoryName = "Panisin" }
                }
                };
                context.Add(room);
                context.SaveChanges();

                context.Database.CloseConnection();
            }

			if (!context.Contestants.Any())
			{
                context.Database.OpenConnection();
                context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Contestants ON");

                var contestants = new List<Contestant> {
                    new Contestant { CountryName = "Albania", OfficialPageUri = "https://eurovision.tv/participant/alfred-amaia", ContestantName = "Eugent Bushpepa", EntryName = "Mall", IsActive = true, YouTubeUri = "https://youtu.be/o-i2Rjbq8nw", StartingOrder = 0, ContestantId = 1 },
                    new Contestant { CountryName = "Austria", OfficialPageUri = "https://eurovision.tv/participant/cesar-sampson", ContestantName = "Cesár Sampson", EntryName = "Nobody But You", IsActive = true, YouTubeUri = "https://youtu.be/I8MyztgOTv8", StartingOrder = 1, ContestantId = 2 },
                    new Contestant { CountryName = "Bulgaria", OfficialPageUri = "https://eurovision.tv/participant/Equinox", ContestantName = "EQUINOX", EntryName = "Bones", IsActive = true, YouTubeUri = "https://youtu.be/Uvy_R3fTHQ4", StartingOrder = 2, ContestantId = 3 },
                    new Contestant { CountryName = "Cyprus", OfficialPageUri = "https://eurovision.tv/country/cyprus", ContestantName = "Eleni Foureira", EntryName = "Fuego", IsActive = true, YouTubeUri = "https://youtu.be/eDSgs6syrgg", StartingOrder = 3, ContestantId = 4 },
                    new Contestant { CountryName = "Czech Republic", OfficialPageUri = "https://eurovision.tv/country/czech-republic", ContestantName = "Mikolas Josef", EntryName = "Lie To Me", IsActive = true, YouTubeUri = "https://youtu.be/9zZPB3y70oU", StartingOrder = 4, ContestantId = 5 },
                    new Contestant { CountryName = "Estonia", OfficialPageUri = "https://eurovision.tv/country/estonia", ContestantName = "Elina Nechayeva", EntryName = "La Forza", IsActive = true, YouTubeUri = "https://youtu.be/76KOUIfDry8", StartingOrder = 5, ContestantId = 6 },
                    new Contestant { CountryName = "Finland", OfficialPageUri = "https://eurovision.tv/country/finland", ContestantName = "Saara Aalto", EntryName = "Monsters", IsActive = true, YouTubeUri = "https://youtu.be/y4xlvh6qW6M", StartingOrder = 6, ContestantId = 7 },
                    new Contestant { CountryName = "France", OfficialPageUri = "https://eurovision.tv/country/france", ContestantName = "Madame Monsieur", EntryName = "Mercy", IsActive = true, YouTubeUri = "https://youtu.be/dHb-gWC-WTc", StartingOrder = 7, ContestantId = 8 },
                    new Contestant { CountryName = "Germany", OfficialPageUri = "https://eurovision.tv/country/germany", ContestantName = "Michael Schulte", EntryName = "You Let Me Walk Alone", IsActive = true, YouTubeUri = "https://youtu.be/o_xTETHwIQg", StartingOrder = 8, ContestantId = 9 },
                    new Contestant { CountryName = "Ireland", OfficialPageUri = "https://eurovision.tv/country/ireland", ContestantName = "Ryan O'Shaughnessy", EntryName = "Together", IsActive = true, YouTubeUri = "https://youtu.be/XAEjQXzW4Uc", StartingOrder = 9, ContestantId = 10 },
                    new Contestant { CountryName = "Israel", OfficialPageUri = "https://eurovision.tv/country/israel", ContestantName = "Netta", EntryName = "TOY", IsActive = true, YouTubeUri = "https://youtu.be/CziHrYYSyPc", StartingOrder = 10, ContestantId = 11 },
                    new Contestant { CountryName = "Italy", OfficialPageUri = "https://eurovision.tv/participant/ermal-meta-fabrizio-moro", ContestantName = "Ermal Meta e Fabrizio Moro", EntryName = "Non Mi Avete Fatto Niente", IsActive = true, YouTubeUri = "https://youtu.be/zguJGdoPPnw", StartingOrder = 11, ContestantId = 12 },
                    new Contestant { CountryName = "Lithuania", OfficialPageUri = "https://eurovision.tv/country/lithuania", ContestantName = "Ieva Zasimauskaitė", EntryName = "When We're Old", IsActive = true, YouTubeUri = "https://youtu.be/CvG3sdGdGUA", StartingOrder = 12, ContestantId = 13 },
                    new Contestant { CountryName = "Portugal", OfficialPageUri = "https://eurovision.tv/country/portugal", ContestantName = "Cláudia Pascoal", EntryName = "O Jardim", IsActive = true, YouTubeUri = "https://youtu.be/kaVp4El9p3s", StartingOrder = 13, ContestantId = 14 },
                    new Contestant { CountryName = "Spain", OfficialPageUri = "https://eurovision.tv/country/spain", ContestantName = "Amaia y Alfred", EntryName = "Tu Canción", IsActive = true, YouTubeUri = "https://youtu.be/nO4mDiJRH6Q", StartingOrder = 14, ContestantId = 15 },
                    new Contestant { CountryName = "United Kingdom", OfficialPageUri = "https://eurovision.tv/country/united-kingdom", ContestantName = "SuRie", EntryName = "Storm", IsActive = true, YouTubeUri = "https://youtu.be/K--kIdOpbJM", StartingOrder = 15, ContestantId = 16 }
				};
				context.AddRange(contestants);
				context.SaveChanges();

                context.Database.CloseConnection();
            }

        }
    }

}
