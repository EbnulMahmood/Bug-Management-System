using DataAccess.Data;
using DataAccess.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Developer = new DeveloperRepository(_context);
        }

        public IDeveloperRepository Developer { get; private set; }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
