using FinanceTrackingWebAPI.DataAccessLayer;
using FinanceTrackingWebAPI.Entities;
using FinanceTrackingWebAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinanceTrackingWebAPI.Services
{
    public interface IGroupService
    {
        IEnumerable<GroupVM> GetAllGroups(string userId);
        Task<int> CreateGroup(GroupVM groups);
        Task<int> UpdateGroup(GroupVM groups);
        bool DeleteGroup(int id);
    }
    public class GroupService : IGroupService
    {
        private readonly IGroupDA _groupDA;
        public GroupService(IGroupDA groupService)
        {
            _groupDA = groupService;
        }

        public bool DeleteGroup(int id)
        {
            var deleteData = _groupDA.DeleteGroup(id);
            if (deleteData)
            {
                return true;
            }
            return false;
        }

      

        public IEnumerable<GroupVM> GetAllGroups(string userId)
        {
            var result = _groupDA.GetGroups(userId);
            if (result != null)
            {
                return (from grp in result
                        select new GroupVM
                        {
                            Id = grp.groupId,
                            GroupName = grp.groupName,
                            Count = grp.Count,
                            UserId = grp.userIds
                        }).ToList();
            }
            return null;
        }

        public async Task<int> CreateGroup(GroupVM groupModel)
        {
            var group = new Group
            {
                GroupName = groupModel.GroupName,
                CreatedBy = groupModel.Id,
                CreatedOn = DateTime.Now,
                IsActive = groupModel.IsActive,
            };
            var addGroup = await _groupDA.AddGroup(group);
            foreach (var id in groupModel.UserId)
            {
                var usersGroup = new UsersGroup
                {
                    GroupId = group.Id,
                    UserId = id,
                };
                await _groupDA.UsersGroups(usersGroup);
            }
            return group.Id;
        }

        public async Task<int> UpdateGroup(GroupVM groupModel)
        {
            var group = new Group
            {
                Id = groupModel.Id,
                GroupName = groupModel.GroupName,
                //UserId = obj.UserId
            };
            
            return await _groupDA.UpdateGroup(group);
        }
    }
}
