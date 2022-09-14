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
            Developers = new DeveloperRepository(_context);
            QAs = new QARepository(_context);
        }

        public IDeveloperRepository Developers { get; private set; }
        public IQARepository QAs { get; private set; }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
