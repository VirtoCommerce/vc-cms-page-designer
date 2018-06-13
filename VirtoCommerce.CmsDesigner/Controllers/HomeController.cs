using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace VirtoCommerce.CmsDesigner.Controllers
{
    public class HomeController : Controller
    {
        public string StorefrontUrl = "http://localhost:2082/";

        public IActionResult Index()
        {
            var fileName = HttpContext.Request.Query["file"].ToString();
            var userName = HttpContext.Request.Query["user"].ToString();

            var pageName = Path.GetFileNameWithoutExtension(fileName);

            ViewData["PageName"] = pageName;
            ViewData["FileName"] = fileName;
            ViewData["UserName"] = userName;

            return View("Designer");
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
