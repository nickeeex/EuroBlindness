﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using WebAPIApplication.Models;

namespace WebAPIApplication.Migrations
{
    [DbContext(typeof(EuroContext))]
    [Migration("20180429115037_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAPIApplication.Models.Category", b =>
                {
                    b.Property<long>("CategoryId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CategoryName");

                    b.Property<long>("RoomId");

                    b.HasKey("CategoryId");

                    b.HasIndex("RoomId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("WebAPIApplication.Models.Contestant", b =>
                {
                    b.Property<long>("ContestantId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ContestantName");

                    b.Property<string>("CountryName");

                    b.Property<string>("EntryName");

                    b.Property<bool>("IsActive");

                    b.Property<int>("StartingOrder");

                    b.Property<string>("YouTubeUri");

                    b.HasKey("ContestantId");

                    b.HasAlternateKey("StartingOrder")
                        .HasName("AlternateKey_StartingOrder");

                    b.ToTable("Contestants");
                });

            modelBuilder.Entity("WebAPIApplication.Models.Room", b =>
                {
                    b.Property<long>("RoomId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<string>("RoomCode")
                        .IsRequired();

                    b.HasKey("RoomId");

                    b.HasAlternateKey("RoomCode")
                        .HasName("AlternateKey_RoomCode");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("WebAPIApplication.Models.User", b =>
                {
                    b.Property<long>("UserId")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsAdmin");

                    b.Property<string>("Name");

                    b.Property<long?>("RoomId");

                    b.Property<string>("UserSub");

                    b.HasKey("UserId");

                    b.HasIndex("RoomId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebAPIApplication.Models.Vote", b =>
                {
                    b.Property<long>("VoteId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("CategoryId");

                    b.Property<long>("ContestantId");

                    b.Property<long?>("RoomId");

                    b.Property<long>("UserId");

                    b.HasKey("VoteId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("ContestantId");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Votes");
                });

            modelBuilder.Entity("WebAPIApplication.Models.Category", b =>
                {
                    b.HasOne("WebAPIApplication.Models.Room", "Room")
                        .WithMany("Categories")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("WebAPIApplication.Models.User", b =>
                {
                    b.HasOne("WebAPIApplication.Models.Room", "Room")
                        .WithMany("Users")
                        .HasForeignKey("RoomId");
                });

            modelBuilder.Entity("WebAPIApplication.Models.Vote", b =>
                {
                    b.HasOne("WebAPIApplication.Models.Category", "Category")
                        .WithMany("Votes")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebAPIApplication.Models.Contestant", "Contestant")
                        .WithMany("Votes")
                        .HasForeignKey("ContestantId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("WebAPIApplication.Models.Room")
                        .WithMany("Votes")
                        .HasForeignKey("RoomId");

                    b.HasOne("WebAPIApplication.Models.User", "User")
                        .WithMany("Votes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
