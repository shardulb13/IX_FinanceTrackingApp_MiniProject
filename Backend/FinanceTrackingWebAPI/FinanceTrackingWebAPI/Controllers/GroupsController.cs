using FinanceTrackingWebAPI.Model;
using FinanceTrackingWebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupService _groupService;
        public GroupsController(IGroupService groupService)
        {
            _groupService = groupService;
        }
        [HttpGet]
        public IActionResult AllGroups()
        {
            return Ok(_groupService.Groups());
        }

        [HttpPost]
        public async Task<GroupsModel> AddGroups(GroupsModel obj)
        {

            return await _groupService.Groups(obj);
        }

        [HttpPut("{id}")]
        public async Task<GroupsModel> UpdateGroup(GroupsModel obj, int id)
        {
            return await _groupService.Groups(obj, id);
        }

        [HttpDelete("{id}")]
        public async Task<GroupsModel> DeleteGroup(int id)
        {
            return await _groupService.Delete(id);
        }

    }
}
