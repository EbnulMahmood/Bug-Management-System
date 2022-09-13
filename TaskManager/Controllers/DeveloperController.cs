using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using DataAccess.Data;
using DataAccess.IRepository;
using DataAccess.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;

namespace TaskManager.Controllers
{
    public class DeveloperController : Controller
    {
        private readonly ILogger<DeveloperController> _logger;
        private readonly IUnitOfWork _unitOfWork;

        public DeveloperController(ILogger<DeveloperController> logger,
            IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public IActionResult Index()
        {
            IEnumerable<Developer> developers = _unitOfWork.Developer.GetAll()
                .OrderByDescending(d => d.CreatedAt)
                .Where(d => d.Status != 404);
            return View(developers);
        }

        [HttpPost]
        public JsonResult GetDevList(int draw, int start, int length)
        {
            int totalRecord = 0;
            int filterRecord = 0;

            // var draw = Request.Form["draw"].FirstOrDefault();


            var sortColumn = Request.Form["columns[" + Request.Form["order[0][column]"].FirstOrDefault() + "][name]"].FirstOrDefault();


            var sortColumnDirection = Request.Form["order[0][dir]"].FirstOrDefault();


            var searchValue = Request.Form["search[value]"].FirstOrDefault();


            // int length = Convert.ToInt32(Request.Form["length"].FirstOrDefault() ?? "0");


            // int start = Convert.ToInt32(Request.Form["start"].FirstOrDefault() ?? "0");


            Console.WriteLine("pageSize-> " + length);

            var data = _unitOfWork.Developer.GetAll().Where(d => d.Status != 404);

            //get total count of data in table
            totalRecord = data.Count();
            Console.WriteLine("totalRecord-> " + totalRecord);

            // search data when search value found
            if (!string.IsNullOrEmpty(searchValue))
            {
                data = data.Where(d =>
                  d.Name.ToLower().Contains(searchValue.ToLower())
                ).Where(d => d.Status != 404);
            }

            // get total count of records after search 
            filterRecord = data.Count();

            //sort data
            // if (!string.IsNullOrEmpty(sortColumn) && !string.IsNullOrEmpty(sortColumnDirection))
            //     data = data.OrderBy(sortColumn + " " + sortColumnDirection);


            //pagination
            var devList = data.Skip(start).Take(length)
                .OrderByDescending(d => d.CreatedAt).ToList().Where(d => d.Status != 404);
            Console.WriteLine("skip-> " + start);
            List<object> dataList = new List<object>();
            foreach(var item in devList)
            {
                // var deleteUrl = $"Developer/Delete/{item.Id}";
                // var deleteUrl = @Url.Action($"Delete/{item.Id}");
                var actionLink = $"<div class='w-75 btn-group' role='group'>" +
                    $"<a class='btn btn-danger mx-2' onClick=DeleteDev('/Developer/Delete/{item.Id}')>Delete</a></div>";
                // var actionLink = $"<div class='w-75 btn-group' role='group'>" +
                //     $"<a href='Developer/Edit/{item.Id}'" +
                //     $"class='btn btn-primary mx-2'><i class='bi bi-pencil-square'></i>Edit</a>" +
                //     $"<a href='Developer/Details/{item.Id}' class='btn btn-secondary mx-2'>" +
                //     $"<i class='bi bi-trash-fill'></i>Details</a></div>";
                string statusConditionClass = item.Status == 1 ? "text-success" : "text-danger";
                string statusConditionText = item.Status == 1 ? "Active" : "Inactive";
                string status = $"<span class='{statusConditionClass}'>{statusConditionText}</span>";

                Dictionary<string, string> dataItems = new Dictionary<string, string>();
                dataItems.Add("id", item.Id.ToString());
                dataItems.Add("name", item.Name);
                dataItems.Add("status", status);
                dataItems.Add("action", actionLink);
                
                dataList.Add(dataItems);
            }

            var returnObj = new { draw = draw, recordsTotal = totalRecord,
                recordsFiltered = filterRecord, data = dataList };
            return Json(returnObj);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Developer developer)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.Developer.Add(developer);
                _unitOfWork.Save();
                TempData["success"] = "Developer created successfully!";
                return RedirectToAction("Index");
            }
            return View(developer);
        }

        public IActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var developer = _unitOfWork.Developer.GetFirstOrDefault(d => d.Id == id);
            if (developer == null || developer.Status == 404)
            {
                return NotFound();
            }
            return View(developer);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Developer developer)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.Developer.Update(developer);
                _unitOfWork.Save();
                TempData["success"] = "Developer updated successfully!";
                return RedirectToAction("Index");
            }
            return View(developer);
        }

        public IActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            var developer = _unitOfWork.Developer.GetFirstOrDefault(d => d.Id == id);
            if (developer == null || developer.Status == 404)
            {
                return NotFound();
            }
            return PartialView("_DevDeletePartial", developer);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeletePost(Guid? id)
        {
            var developer = _unitOfWork.Developer.GetFirstOrDefault(d => d.Id == id);
            if (developer == null || developer.Status == 404)
            {
                return NotFound();
            }
            developer.Status = 404;
            _unitOfWork.Developer.Update(developer);
            _unitOfWork.Save();
            TempData["success"] = "Developer deleted successfully!";
            return RedirectToAction("Index");
        }

        public IActionResult Details(Guid? id)
        {
            if (id == null) return NotFound();
            var developer = _unitOfWork.Developer.GetAll().FirstOrDefault(d => d.Id == id);
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