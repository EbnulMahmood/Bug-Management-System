using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models;

namespace DataAccess.IRepository
{
    public interface IQARepository : IRepository<QA>
    {
        void Update(QA obj);
    }
}