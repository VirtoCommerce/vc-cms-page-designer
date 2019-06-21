using System.Web.Http;

namespace VirtoCommerce.PageBuilderModule.Controllers.Api
{
    [RoutePrefix("api/VirtoCommerce.PageBuilderModule")]
    public class ManagedModuleController : ApiController
    {
        // GET: api/managedModule
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            return Ok(new { result = "Hello world!" });
        }
    }
}
