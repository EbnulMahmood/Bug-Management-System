using Microsoft.EntityFrameworkCore;
using Models;

namespace DataAccess.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Developer> Developers { get; set; }
        public DbSet<QA> QAs { get; set; }
    }
}
