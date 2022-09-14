using DataAccess.Data;
using DataAccess.IRepository;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class QARepository : Repository<QA>, IQARepository
    {
        private readonly ApplicationDbContext _context;

        public QARepository(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        public void Update(QA obj)
        {
            _context.QAs.Update(obj);
        }
    }
}
