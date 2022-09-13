using DataAccess.Data;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class DeveloperRepository : Repository<Developer>, IDeveloperRepository
    {
        private readonly ApplicationDbContext _context;
        public DeveloperRepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }
        
        public void Save()
        {
            _context.SaveChanges();
        }

        public void Update(Developer obj)
        {
            _context.Developers.Update(obj);
        }
    }
}