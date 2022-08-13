using AltEvent.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace AltEvent.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Company> Companies { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Event> Events { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

        //

        public DatabaseContext()
            : this($"Data Source={GetTestDbPath()}")
        {
        }

        public DatabaseContext(string connectionString)
            : base(GetOptions(connectionString))
        {
        }

        private static string GetTestDbPath()
        {
            // C:\Users\<NAME>\AppData\Local
            var temp = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
            return Path.Join(temp, "altevent.db");
        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return new DbContextOptionsBuilder().UseSqlite(connectionString).Options;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // See:

            // Join-tables with fluent api
            // https://stackoverflow.com/questions/65779730/manytomany-relation-in-ef-core-fluent-api/65780863#65780863

            // CreatedAt, UpdatedAt
            // https://stackoverflow.com/questions/45429719/automatic-createdat-and-updatedat-fields-onmodelcreating-in-ef6

            //

            modelBuilder.Entity<Company>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<Company>()
                .HasMany(c => c.Users)
                .WithMany(u => u.Companies)
                .UsingEntity<Dictionary<string, object>>("CompaniesUsers",
                    e => e.HasOne<User>().WithMany().HasForeignKey("UserId"),
                    e => e.HasOne<Company>().WithMany().HasForeignKey("CompanyId"),
                    e => e.ToTable("CompaniesUsers")
                );

            modelBuilder.Entity<Company>()
                .Property(c => c.Name)
                .HasMaxLength(32);

            //

            modelBuilder.Entity<Event>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<Event>()
                .HasOne(e => e.Company)
                .WithMany()
                .HasForeignKey(e => e.CompanyId);

            modelBuilder.Entity<Event>()
                .HasOne(e => e.Creator)
                .WithMany()
                .HasForeignKey(e => e.CreatorId);

            modelBuilder.Entity<Event>()
                .HasMany(e => e.Hosts)
                .WithMany(u => u.Events)
                .UsingEntity<Dictionary<string, object>>("EventsHosts",
                    e => e.HasOne<User>().WithMany().HasForeignKey("UserId"),
                    e => e.HasOne<Event>().WithMany().HasForeignKey("EventId"),
                    e => e.ToTable("EventsHosts")
                );

            modelBuilder.Entity<Event>()
                .Property(e => e.Name)
                .HasMaxLength(32);

            modelBuilder.Entity<Event>()
                .Property(e => e.Location)
                .HasMaxLength(64);

            modelBuilder.Entity<Event>()
                .Property(e => e.IsDeleted)
                .HasDefaultValue(false);

            modelBuilder.Entity<Event>()
                .HasIndex(e => e.CompanyId);

            //

            modelBuilder.Entity<Reservation>()
                .HasKey(r => r.Id);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Event)
                .WithMany(e => e.Reservations)
                .HasForeignKey(r => r.EventId);

            modelBuilder.Entity<Reservation>()
                .Property(r => r.Name)
                .HasMaxLength(32);

            modelBuilder.Entity<Reservation>()
                .Property(r => r.Phone)
                .HasMaxLength(32);

            modelBuilder.Entity<Reservation>()
                .Property(r => r.Email)
                .HasMaxLength(64);

            modelBuilder.Entity<Reservation>()
                .HasIndex(r => r.EventId);

            //

            modelBuilder.Entity<User>()
                .HasKey(u => u.Id);

            modelBuilder.Entity<User>()
                .Property(u => u.Name)
                .HasMaxLength(32);

            modelBuilder.Entity<User>()
                .Property(u => u.Phone)
                .HasMaxLength(32);

            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .HasMaxLength(64);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>()
                .Property(u => u.Password)
                .HasMaxLength(64);
        }

        public override int SaveChanges()
        {
            UpdateTimestamps();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            var entities = ChangeTracker.Entries()
                .Where(x => x.Entity is BaseEntity && (x.State == EntityState.Added || x.State == EntityState.Modified));

            foreach (var entity in entities)
            {
                var now = DateTime.UtcNow;

                if (entity.State == EntityState.Added)
                    ((BaseEntity)entity.Entity).CreatedAt = now;

                ((BaseEntity)entity.Entity).UpdatedAt = now;
            }
        }
    }
}
