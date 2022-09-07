using FinanceTrackingWebAPI.DataAccessLayer;
using FinanceTrackingWebAPI.Entities;
using FinanceTrackingWebAPI.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.Services
{
    public interface IGroupService
    {
        IEnumerable<GroupsModel> Groups();
        Task<GroupsModel> Groups(GroupsModel obj);
        Task<GroupsModel> Group(int id);
        Task<GroupsModel> Groups(GroupsModel obj, int id);
        Task<GroupsModel> Delete(int id);
    }
    public class GroupService : IGroupService
    {
        private readonly IGroupDA _groupService;
        public GroupService(IGroupDA groupService)
        {
            _groupService = groupService;
        }

        public async Task<GroupsModel> Delete(int id)
        {
            var deleteData = await _groupService.Delete(id);
            if (deleteData != null)
            {
                return new GroupsModel
                {
                    Id = deleteData.Id
                };
            }
            return null;
        }

        public async Task<GroupsModel> Group(int id)
        {
            var result = await _groupService.Group(id);
            if (result != null)
            {
                return new GroupsModel
                {
                    Id = result.Id,
                    GroupName = result.GroupName,
                    UserId = result.UserId
                };
            }
            return null;
        }

        public IEnumerable<GroupsModel> Groups()
        {
            var result = _groupService.Groups();
            if (result != null)
            {
                return (from exp in result
                        select new GroupsModel
                        {
                          Id=exp.Id,
                          GroupName=exp.GroupName,
                          UserId=exp.UserId
                        }).ToList();
            }
            return null;
        }

        public async Task<GroupsModel> Groups(GroupsModel obj)
        {
            var expense = new Groups
            {
                GroupName = obj.GroupName,
                UserId = obj.UserId
            };
            var add = await _groupService.Groups(expense);
            return new GroupsModel
            {
                Id = add.Id
            };
        }

        public async Task<GroupsModel> Groups(GroupsModel obj, int id)
        {
            var expObj = new Groups
            {
               GroupName = obj.GroupName,
               UserId = obj.UserId
            };
            var updatedata = await _groupService.Groups(expObj, id);
            return new GroupsModel
            {
              Id = updatedata.Id
            };
        }
    }
}
