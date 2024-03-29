﻿using DataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepository
{
    public interface IUnitOfWork
    {
        IDeveloperRepository Developers { get; }
        IQARepository QAs { get; }
        void Save();
    }
}
