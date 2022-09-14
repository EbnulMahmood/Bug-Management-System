using DataAccess.Data;
using DataAccess.IRepository;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace TaskManager.Controllers
{
    public class QAController : Controller
    {
        private readonly ILogger<QAController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public QAController(ILogger<QAController> logger,
            IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public IActionResult Index()
        {
            IEnumerable<QA> qAs = _unitOfWork.QAs.GetAll()
                .Where(d => d.Status != 404)
                .OrderByDescending(q => q.CreatedAt);
            return View(qAs);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(QA qA)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.QAs.Add(qA);
                _unitOfWork.Save();
                TempData["success"] = "QA Eng. created successfully!";
                return RedirectToAction("Index");
            }
            return View(qA);
        }

        public IActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var qA = _unitOfWork.QAs.GetFirstOrDefault(q => q.Id == id);
            if (qA == null || qA.Status == 404)
            {
                return NotFound();
            }
            return View(qA);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(QA qA)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.QAs.Update(qA);
                _unitOfWork.Save();
                TempData["success"] = "QA Eng. updated successfully!";
                return RedirectToAction("Index");
            }
            return View(qA);
        }

        public IActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var qA = _unitOfWork.QAs.GetFirstOrDefault(q => q.Id == id);
            if (qA == null || qA.Status == 404)
            {
                return NotFound();
            }
            return PartialView("_QADeletePartial", qA);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeletePost(Guid? id)
        {
            var qA = _unitOfWork.QAs.GetFirstOrDefault(q => q.Id == id);
            if (qA == null || qA.Status == 404)
            {
                return NotFound();
            }
            qA.Status = 404;
            _unitOfWork.QAs.Update(qA);
            _unitOfWork.Save();
            TempData["success"] = "QA Eng. deleted successfully!";
            return RedirectToAction("Index");
        }

        public IActionResult Details(Guid? id)
        {
            if (id == null) return NotFound();
            var qA = _unitOfWork.QAs.GetFirstOrDefault(q => q.Id == id);
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
