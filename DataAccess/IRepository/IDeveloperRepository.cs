using DataAccess.IRepository;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public interface IDeveloperRepository : IRepository<Developer>
    {
        void Update(Developer obj);
        void Save();
    }
}