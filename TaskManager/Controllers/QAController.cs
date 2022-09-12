using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    public class QAController : Controller
    {
        private readonly ILogger<QAController> _logger;
        private readonly ApplicationDbContext _context;

        public QAController(ILogger<QAController> logger,
            ApplicationDbContext context)
        {
            _context = context;
            _logger = logger;
        }

        public IActionResult Index()
        {
            IEnumerable<QA> qAs = _context.QAs.Where(d => d.Status != 404)
                .OrderByDescending(q => q.CreatedAt);
            return View(qAs);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(QA qA)
        {
            if (ModelState.IsValid)
            {
                _context.QAs.Add(qA);
                await _context.SaveChangesAsync();
                TempData["success"] = "QA Eng. created successfully!";
                return RedirectToAction("Index");
            }
            return View(qA);
        }

        public async Task<IActionResult> Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var qA = await _context.QAs.FindAsync(id);
            if (qA == null || qA.Status == 404)
            {
                return NotFound();
            }
            return View(qA);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(QA qA)
        {
            if (ModelState.IsValid)
            {
                _context.QAs.Update(qA);
                await _context.SaveChangesAsync();
                TempData["success"] = "QA Eng. updated successfully!";
                return RedirectToAction("Index");
            }
            return View(qA);
        }

        public async Task<IActionResult> Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var qA = await _context.QAs.FindAsync(id);
            if (qA == null || qA.Status == 404)
            {
                return NotFound();
            }
            return PartialView("_QADeletePartial", qA);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeletePost(Guid? id)
        {
            var qA = await _context.QAs.FindAsync(id);
            if (qA == null || qA.Status == 404)
            {
                return NotFound();
            }
            qA.Status = 404;
            _context.QAs.Update(qA);
            await _context.SaveChangesAsync();
            TempData["success"] = "QA Eng. deleted successfully!";
            return RedirectToAction("Index");
        }

        public IActionResult Details(Guid? id)
        {
            if (id == null) return NotFound();
            var qA = _context.QAs.FirstOrDefault(q => q.Id == id);
            if (qA == null || qA.Status == 404) return NotFound();
            return View(qA);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }
    }
}
