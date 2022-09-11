using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TaskManager.Data;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    public class DeveloperController : Controller
    {
        private readonly ILogger<DeveloperController> _logger;
        private readonly ApplicationDbContext _context;

        public DeveloperController(ILogger<DeveloperController> logger, 
            ApplicationDbContext context)
        {
            _context = context;
            _logger = logger;
        }

        public IActionResult Index()
        {
            IEnumerable<Developer> developers = _context.Developers.Where(d => d.Status != 404)
                .OrderByDescending(d => d.CreatedAt);
            return View(developers);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Developer developer)
        {
            if (ModelState.IsValid)
            {
                _context.Developers.Add(developer);
                await _context.SaveChangesAsync();
                TempData["success"] = "Developer created successfully!";
                return RedirectToAction("Index");
            }
            return View(developer);
        }

        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var developer = await _context.Developers.FindAsync(id);
            if (developer == null || developer.Status == 404)
            {
                return NotFound();
            }
            return View(developer);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(Developer developer)
        {
            if (ModelState.IsValid)
            {
                _context.Developers.Update(developer);
                await _context.SaveChangesAsync();
                TempData["success"] = "Developer updated successfully!";
                return RedirectToAction("Index");
            }
            return View(developer);
        }

        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var developer = await _context.Developers.FindAsync(id);
            if (developer == null || developer.Status == 404)
            {
                return NotFound();
            }
            return PartialView("_DevDeletePartial", developer);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeletePost(Guid? id)
        {
            var developer = await _context.Developers.FindAsync(id);
            if (developer == null || developer.Status == 404)
            {
                return NotFound();
            }
            developer.Status = 404;
            _context.Developers.Update(developer);
            await _context.SaveChangesAsync();
            TempData["success"] = "Developer deleted successfully!";
            return RedirectToAction("Index");
        }

        public IActionResult Details(Guid? id)
        {
            if (id == null) return NotFound();
            var developer = _context.Developers.FirstOrDefault(d => d.Id == id);
            if (developer == null || developer.Status == 404) return NotFound();
            return View(developer);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }
    }
}